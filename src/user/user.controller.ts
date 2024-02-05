import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, ClassSerializerInterceptor, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/auth/enum/roles.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from 'src/dto/profile.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { profile } from 'console';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';


@Controller()
export class UserController {
  constructor(private  userService: UserService) {}

  @Get('myprofile')
  @UseGuards(AuthGuard)
  @ApiOkResponse()
  // @ApiBearerAuth()
  async getProfile(@Req()req:Request){ 
    return req.user;
    }
  

  @Post('createprofile')
  @UseGuards(AuthGuard)
  async profile(@Body() payload:ProfileDto, @Req() req:Request){
    return await this.userService.createProfile(payload, req)
  }

  @Patch('updateprofile')
  @UseGuards(AuthGuard)
  async updateProfile(@Body() payload:ProfileDto, @Req() req:Request){
    return await this.userService.updateprofile(payload, req)
  }


  @Get('users')
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(){
  return await this.userService.GetAllusers()
  }

  @Get('finduser')
  @UseGuards(AuthGuard)
  async user(@Body() @Req() req:Request){
    return await this.userService.getUser(req)
  }

}
