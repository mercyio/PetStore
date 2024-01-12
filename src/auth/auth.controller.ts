import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
import { Role, Roles } from "src/auth/guard/roles.enum";
import { AuthGuard } from "./guard/auth.guard";


@Controller('user')
export class AuthController{
    constructor(
      private authService:AuthService,
      ){}
    
    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginUser(@Body() payload:LoginDto) {
      const accessToken = await this.authService.login(payload.Email, payload.Password);
      return accessToken;
    }

    @Post('signup')
    async signupUser (@Body() payload: SignupDto){
      const user = await this.authService.signup(payload);
      return  user;
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    async getProfile(@Request() req){ 
      return req.user;
      }

      // @UseGuards(AuthGuard('jwt-refreshtoken'))
     @Post('auth/refreshtoken')
     async refreshToken(@Body() payload){
    return await this.authService.login(payload.Email, payload.Password);
  }
    
}