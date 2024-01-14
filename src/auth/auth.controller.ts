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

import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
import { Role, Roles } from "src/auth/guard/roles.enum";
import { AuthGuard } from "./guard/auth.guard";
import { Request, Response } from "express";


@Controller('user')
export class AuthController{
    constructor(
      private authService:AuthService,
      ){}
    
    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginUser(@Body() payload:LoginDto, @Req()req:Request, @Res()res:Response) {
      const accessToken = await this.authService.login(payload.Email, payload.Password, req, res);
      return accessToken;
    }

    @Post('signup')
    async signupUser (@Body() payload: SignupDto){
      const user = await this.authService.signup(payload);
      return  user;
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    async getProfile(@Req()req:Request){ 
      return req.user;
      }

      // @UseGuards(AuthGuard('jwt-refreshtoken'))
  //    @Post('auth/refreshtoken')
  //    async refreshToken(@Body() payload){
  //   return await this.authService.login(payload.Email,payload.Password);
  // }
    
}