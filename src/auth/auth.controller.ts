import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth-guard/local.auth.guard";
import { AuthService } from "./auth.service";
import { jwtAuthGuard } from "src/auth/auth-guard/jwt.auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto } from "src/auth/auth-dto/login.dto";
import { SignupDto } from "src/auth/auth-dto/signup.dto";


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
    
    // @UseGuards(jwtAuthGuard)
    @Get('/profile')
    getProfile(@Body() payload: LoginDto): string{
        return   `this route is protected, but the user ${payload.Email} has access`
      }

      @UseGuards(AuthGuard('jwt-refreshtoken'))
     @Post('auth/refreshtoken')
     async refreshToken(@Body() payload){
    return await this.authService.login(payload.Email, payload.Password);
  }
    
}