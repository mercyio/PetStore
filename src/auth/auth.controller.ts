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
import { AuthGuard } from "./guard/auth.guard";
import { Request, Response } from "express";
import { RolesGuard } from "./guard/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { Role } from "./enum/roles.enum";
import { ApiCreatedResponse, ApiBody, ApiUnauthorizedResponse, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { LoginDto } from "src/dto/login.dto";
import { OrderDto } from "src/dto/order.dto";
import { createPetsDto } from "src/dto/pet-dto/create-pet.dto";
import { ProfileDto } from "src/dto/profile.dto";
import { SignupDto } from "src/dto/signup.dto";
import { reviewDto } from "src/dto/review.dto";
// import { BlockGuard } from "./guard/block.guard";
import { ForgotPasswordDto } from "src/dto/forgotpasswod.dto";
import { ResetPasswordto } from "src/dto/resetpassword.dto";
import { BlockGuard } from "./guard/block.guard";



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
    

    @Get('myprofile')
    @UseGuards(AuthGuard, BlockGuard)
    @ApiOkResponse()
    // @ApiBearerAuth()
    async getProfile(@Req()req:Request){ 
      return req.user;
      }
    

    @Post('createprofile')
    @UseGuards(AuthGuard, BlockGuard)
    async profile(@Body() payload:ProfileDto, @Req() req:Request){
      return await this.authService.createProfile(payload, req)
    }

    @Patch('updateprofile')
    @UseGuards(AuthGuard, BlockGuard)
    async updateProfile(@Body() payload:ProfileDto, @Req() req:Request){
      return await this.authService.updateprofile(payload, req)
    }


    @Get('users')
    @Roles(Role.admin)
    @UseGuards(AuthGuard, RolesGuard, BlockGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsers(){
    return await this.authService.GetAllusers()
    }

    @Get('finduser')
    @UseGuards(AuthGuard, BlockGuard)
    async user(@Body() @Req() req:Request){
      return await this.authService.getUser(req)
    }


    
    @Post('block/:userId')
    @UseGuards(AuthGuard, BlockGuard)
    @Roles(Role.admin, Role.vendor)
    async blockuser(@Param('userId') userId:string){
      return await this.authService.blockUser(userId)
    }
    
    // @Post('unblock/:userId')
    // @HttpCode(200)
    // @UseGuards(AuthGuard, BlockGuard)
    // @Roles(Role.admin, Role.vendor)
    // async unblockuser(@Param('userId') userId: string){
    //   return await this.authService.unblock(userId)
    // }


    // @UseGuards(AuthGuard, BlockGuard)
    // // @Roles('user')
    // @Post('forgot-password')
    // async requestPasswordReset(@Body() payload:ForgotPasswordDto, @Req() req:Request, @Res() res:Response) {
    //   return await this.authService.forgotPassword( res, req, payload);
    // }
    
    
    // @UseGuards(AuthGuard, BlockGuard)
    // // @Roles('user')
    // @Post('reset-password/:userId/:token')
    // async resetPassword( @Body() payload: ResetPasswordto, @Param() params:['id, token'],  @Req() req:Request,  @Res() res:Response,) {
    //   return await this.authService.resetpassword(payload, req, res);
    // }

    

    @Post('createVendorPet')
    @Roles(Role.vendor)
    @UseGuards(AuthGuard)
    async ownersPet(@Body() payload:createPetsDto, @Req() req:Request){
      return await this.authService.petOwned(payload, req)
    }

    // @Post('pet-order')
    // @UseGuards(AuthGuard)
    // async UsersOrder(@Body() payload: createPetsDto, @Req() req:Request){
    //   return await this.authService.petOwned(payload, req)
    // }


    @Post('review/:id')
    @UseGuards(AuthGuard)
    async reviews(@Param('id') id:string, @Body() payload: reviewDto, @Req() req:Request,){
      return await this.authService.review(id, payload, req)
    }


    @Post('user-pet/:id')
    @UseGuards(AuthGuard)
    async userswihpet(@Param('id') id: string,  @Body() payload: createPetsDto, @Req() req:Request,){
      return await this.authService.userswithpet( id, payload, req)
    }
 
    @Post('createorder/:id')
    @UseGuards(AuthGuard)
    async order( @Param('id') id: string, @Body() payload: OrderDto, @Req() req:Request,){
      return await this.authService.createOrder( id, payload, req)
    }

    @Post('bid/:id')
    @UseGuards(AuthGuard)
    async userPet( @Param('id') id: string, @Body() payload: OrderDto, @Req() req:Request,){
      return await this.authService.Order( id, payload, req)
    }

    
    

//       // @UseGuards(AuthGuard('jwt-refreshtoken'))
//   //    @Post('auth/refreshtoken')
//   //    async refreshToken(@Body() payload){
//   //   return await this.authService.login(payload.Email,payload.Password);
//   // }
    
}