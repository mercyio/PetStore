import { BadRequestException, Body, ExecutionContext, HttpException, Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AnySoaRecord } from 'dns';
import { SignupDto } from './dto/signup.dto';
import { SerializeUsers } from './serializer/users.serialize';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { error } from 'console';

// import { generate } from 'rxjs';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity)
     private userRepo: Repository<UserEntity>,
     @InjectRepository(ProfileEntity)
     private profileRepo: Repository<ProfileEntity>,
     private jwtService :JwtService,
    ){}

    async signup(payload: SignupDto) {
      payload.Email=payload.Email.toLowerCase()

      const {Email, Password, userName, ...rest}=payload
      
      const userEmail= await this.userRepo.findOne({where:{Email:Email}})

      if(userEmail){
        throw new HttpException('EMAIL ALREADY EXIST', 400)
      }
      
      const repeatedName = await this.userRepo.findOne({where:{userName}})

      if(repeatedName){
        throw new UnauthorizedException('userName already exist')
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

    async getUser(userName:string){
      const user = await this.userRepo.findOne({where:{userName}})
      if(!user){
        throw new UnauthorizedException('user not found')
      }
      return user;
    }



    async createProfile(userName: string, payload: ProfileDto){
     
    const findUser = await this.userRepo.findOne({where:{userName} });

    if (!findUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = findUser

    const userPro =  this.profileRepo.create({
 
      ...payload,
      user
    })
    // await this.profileRepo.save(userPro)

   return await this.profileRepo.save(userPro)

    // const user = this.userRepo.create({userName });
    // const profile = await this.profileRepo.create();
    // user.profile = profile
    // await this. profileRepo.save(profile)
    // const savedUser = await this.userRepo.save(user);
  
    // return {
    //   message: 'Successfully created',
    //   result: savedUser,
    // };
  
}




// async updateProfile(userName: string, updateProfileDto: UpdateProfileDto) {
//   const { firstname, lastname, phonenumber, role } = updateProfileDto;

//   try {
//     const user = await this.userRepo.findOne({ where: { userName }, relations: ['profile'] });

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     if (!user.profile) {
//       // user.profile = this.profileRepo.create();
//       throw new NotFoundException('no profile found, please create a profile');
//     }

//     user.profile.firstname = firstname ;
//     user.profile.lastname = lastname;
//     user.profile.phonenumber = phonenumber;
//     user.profile.role = role;
// //  
//     const updatedProfile = await this.profileRepo.save(user.profile);

//     return {
//       message: 'Profile successfully updated',
//       result: updatedProfile,
//     };
//   } catch (error) {
//     throw new BadRequestException(`Failed to update profile: ${error.message}`);
//   }
// }



}

    // async updateProfile(userName:string, payload:UpdateProfileDto){
    //   const findProfile = await this.userRepo.findOne({where:{userName}})
    //   if(!findProfile){
    //     throw new UnauthorizedException('invalid profile')
    //   }
    //   const update = await this.userRepo
    //   .createQueryBuilder()
    //   .update(ProfileEntity)
    //   .where('userName = :userName', {userName})
    //   .set(payload)
    //   .execute();

    //   return {
    //     success: true,
    //     message: 'Successfully updated profile',
    //   };
    // }
    
    

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
    

