import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, ClassSerializerInterceptor, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/auth/enum/roles.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from 'src/auth/dto/profile.dto';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { profile } from 'console';

@Controller('user/profile')
export class UserController {
  constructor(private  userService: UserService) {}



 
    @Post()
    async CreateProfile(payload:ProfileDto){
      return await this.userService.createProfile(payload)
    }user


    @Patch(':id')
    async UpdateProfile(id: string, payload:UpdateProfileDto){
      return await this.userService.updateProfile(id, payload)
    }

    


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
