import { BadRequestException, Body, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Request } from 'express';

// import { generate } from 'rxjs';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity) private UserEntity: Repository<UserEntity>,
    private jwtService :JwtService,
    ){}

    async signup(payload: SignupDto) {
      payload.Email=payload.Email.toLowerCase()

      const {Email, Password, ...rest}=payload
      
      const userEmail= await this.UserEntity.findOne({where:{Email:Email}})

      if(userEmail){
        throw new HttpException('EMAIL ALREADY EXIST', 400)
      }

      const saltOrRounds = 10;

      const hashedPassword = await bcrypt.hash(Password, saltOrRounds);
      try{
        const user = await this.UserEntity.save({...payload, Password: hashedPassword});
        await this.UserEntity.save(user);
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
  


  async login(Email:string, Password: string) {
    const findUser = await this.UserEntity.findOne({where : {Email}});
   
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
      Username: findUser.username,
      Email: findUser.Email,
      Password: findUser.Password,
      PhoneNumber:findUser.PhoneNumber,
      Role: findUser.role
    };

    return {
     accessToken: this.jwtService.sign(payload)
      }
    }
    
    async user(Email:string){
      const locateUser = await this.UserEntity.findOne({where:{Email}})
      return locateUser
    }
  }
  
   
