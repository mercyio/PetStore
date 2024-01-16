import { BadRequestException, Body, ExecutionContext, HttpException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AnySoaRecord } from 'dns';
import { SignupDto } from './dto/signup.dto';
import { SerializeUsers } from './serializer/users';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { profileEntity } from './entities/profile.entity';

// import { generate } from 'rxjs';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity)
     private userRepo: Repository<UserEntity>,
    @InjectRepository(profileEntity)
    private profileRepo: Repository<profileEntity>,
     private jwtService :JwtService,
    ){}

    async signup(payload: SignupDto) {
      payload.Email=payload.Email.toLowerCase()

      const {Email, Password, ...rest}=payload
      
      const userEmail= await this.userRepo.findOne({where:{Email:Email}})

      if(userEmail){
        throw new HttpException('EMAIL ALREADY EXIST', 400)
      }

      const saltOrRounds = 10;

      const hashedPassword = await bcrypt.hash(Password, saltOrRounds);
      try{
        const user = await this.userRepo.save({...payload, Password: hashedPassword});
        await this.userRepo.save(user);
        delete user.Password;
        return user;
      }
      catch(err){
        if(err.code === '22P02'){
          throw new BadRequestException('ADMIN ROLE SHOULD BE LOWERCASE')
        }
        return err
      }   
    }
  


    async login(Email:string, Password:string, @Req()req:Request, @Res()res:Response) {

      const findUser = await this.userRepo.findOne({where : {Email}});
     
      if(!findUser){
        throw new UnauthorizedException('INVALID CREDENTIALS')
      }
  
      // console.log(comparePassword)
  
      const comparePassword = await bcrypt.compare(Password,findUser.Password)
  
      if(comparePassword !== true){
        throw new UnauthorizedException("invalid credential")
      }
  
        const payload = {
        userId: findUser.userId,
        Username: findUser.userName,
        Email: findUser.Email,
        Password: findUser.Password,
        Role: findUser.role
      };
      

      const Token = await this.jwtService.sign(payload)

     res.cookie('isAuthenticated',Token,{
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000
   });

   return res.send ({
      success: true,
      message:`USER SUCCESSFULLY LOGGED-IN`,
      accessToken:Token
       })
     }



     async logout(@Req()req:Request, @Res()res:Response){
      const clearCookie = res.clearCookie('isAuthenticated')
       const response = res.send(`user sucessfully logedout`)
       return{
         clearCookie,
         response
      }
     }


     async GetAllusers(){
      const Users = await this.userRepo.find()

      const serializeAllUsers = Users.map((users) => new SerializeUsers(users))
      
      return serializeAllUsers;
    }

    async createProfile(payload:ProfileDto){
        const createUser = await this.profileRepo.save(payload)
        return createUser;
    }


    async updateProfile(Id:string, payload:UpdateProfileDto){
      const update = await this.profileRepo.update(Id, payload)
    }
}
    
    

  // async login (Email:string, Password: string, @Req() req:Request, @Res() res:Response) {
    
  //   const findUser = await this.UserEntity.findOne({where : {Email}});

  //   if(!findUser){
  //     throw new UnauthorizedException('EMAIL NOT FOUND')
  //   }

  //   const comparePassword = await bcrypt.compare(Password,findUser.Password)

  //   if(comparePassword !== true){
  //     throw new UnauthorizedException("INVALID PASSWORD")
  //   }

  //     const payload = {
  //     userId: findUser.userId,
  //     Username: findUser.username,
  //     Email: findUser.Email,
  //     Password: findUser.Password,
  //     PhoneNumber:findUser.PhoneNumber,
  //     Role: findUser.role
  //   };

  //   const Token = await this.jwtService.signAsync(payload)

  //   res.cookie('isAuthenticated',Token,{
  //     httpOnly: true,
  //     maxAge: 1 * 60 * 60 * 1000
  //   });

  //   return {
  //     success:true,
  //     accessToken:Token
  //     }
  //   }
    
  //   async user(Email:string){
  //     const locateUser = await this.UserEntity.findOne({where:{Email}})
  //     return locateUser
  //   }



    // async logout(@Req()req:Request, @Res()res:Response){
    //   const clearCookie = res.clearCookie('isAuthenticated')
    //   const response = res.send(`user sucessfully logedout`)
    //   return{
    //     clearCookie,
    //     response
    //   }
    // }
    
  
  
   
