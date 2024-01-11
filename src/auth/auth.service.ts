import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/auth-entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/auth-dto/signup.dto';

// import { generate } from 'rxjs';

@Injectable()
export class AuthService {

  constructor ( 
    @InjectRepository(UserEntity) private UserEntity: Repository<UserEntity>,
    private jwtService :JwtService,
    ){}

    async signup(@Body() payload: SignupDto) {

      const saltOrRounds = 10;

      const hashedPassword = await bcrypt.hash(payload.Password, saltOrRounds);

      const user = await this.UserEntity.save({...payload, Password: hashedPassword});
    
      return user;
    }

  //   async signup(@Body() payload: CreateAuthDto){
  //     const user = await this. UserEntity.save(payload);
  //     return user;
  // }
  


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
      Email: findUser.Email,
      Password: findUser.Password
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

      // refreshToken: await this.generateToken(user.id)

  // async generateToken(id){
    
  //   let refreshToken = randToken.generate(16);
  //   let expiryDate = new Date();
  //   expiryDate.setDate(expiryDate.getDate() + 6);
  //   await this.petService.saveorupdateRefreshToken(refreshToken, id, expiryDate);
  //   return refreshToken


  // }

