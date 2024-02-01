// import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { LoginDto } from "../auth/dto/login.dto";
// import { SignupDto } from "../auth/dto/signup.dto";
// import { AuthGuard } from "./guard/auth.guard";
// import {Request, Response} from 'express';


// @Controller('user')
// export class AuthController{
//     constructor(
//       private authService:AuthService,
//       ){}
    
//     @Post('/login')
//     async loginUser(@Body() payload:LoginDto, @Req() req:Request, @Res() res:Response) {
//       const accessToken = await this.authService.login(payload.Password, payload.Email);
//       return accessToken;
//     }

//     @Post('signup')
//     async signupUser (@Body() payload: SignupDto){
//       const user = await this.authService.signup(payload);
//       return  user;
//     }

//     // @UseGuards(AuthGuard)
//     @Get('/profile')
//     async getProfile(@Req()req:Request){ 
//       return req.user;
//       }
    
//     @HttpCode(200)
//     @Post('logout')
//     async logout(@Req() req:Request, @Res() res:Response){
//       return await this.authService.logout(req, res)
//     }

//       // @UseGuards(AuthGuard('jwt-refreshtoken'))
//   //    @Post('auth/refreshtoken')
//   //    async refreshToken(@Body() payload){
//   //   return await this.authService.login(payload.Email, payload.Password);
//   // }
    
// }

import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Param, Patch, Post, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
import { AuthGuard } from "./guard/auth.guard";
import { Request, Response } from "express";
import { RolesGuard } from "./guard/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { Role } from "./enum/roles.enum";
import { ProfileDto } from "./dto/profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ApiCreatedResponse, ApiBody, ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";


@Controller('user')
export class AuthController{
    constructor(
      private authService:AuthService,
      ){}
    
    @Post('signup')
  @ApiCreatedResponse({description: "User Signup/Registeration"})
  @ApiBody({type: SignupDto})
    async signupUser (@Body() payload: SignupDto){
      const user = await this.authService.signup(payload);
      return  user;
      }


    @Post('/login')
    @ApiCreatedResponse({description: "User Signup/Registeration"})
    @ApiBody({type: SignupDto})
    @ApiUnauthorizedResponse({description: "Invalid credentials"})
    async loginUser(@Body() payload:LoginDto, @Req()req:Request, @Res()res:Response) {
      const accessToken = await this.authService.login(payload.Email, payload.Password, req, res);
      return accessToken;
    }
    

    @HttpCode(200)
    @Post('logout')
    async logout (@Req()req:Request, @Res()res:Response){
      return await this.authService.logout(req, res)
    }
    

    @Get('profile')
    @UseGuards(AuthGuard)
    @ApiOkResponse()
    // @ApiBearerAuth()
    async getProfile(@Req()req:Request){ 
      return req.user;
      }
    

    @Post('/:userName/createprofile')
    @UseGuards(AuthGuard)
    async createProfile( @Param('userId') userName:string,@Body() payload:ProfileDto){
      return await this.authService.createProfile(userName, payload)
    }

    // @Patch('updateprofile')
    // @UseGuards(AuthGuard)
    // async updateProfile(@Param('userName') userName:string, payload:ProfileDto){
    //   return await this.authService.updateProfile(userName, payload)
    // }


    @Get('users')
    @Roles(Role.admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsers(){
    return await this.authService.GetAllusers()
    }

    @Get(':userName')
    @UseGuards(AuthGuard)
    async user(@Param('userName') userName:string){
      return await this.authService.getUser(userName)
    }

    
    

      // @UseGuards(AuthGuard('jwt-refreshtoken'))
  //    @Post('auth/refreshtoken')
  //    async refreshToken(@Body() payload){
  //   return await this.authService.login(payload.Email,payload.Password);
  // }
    
}