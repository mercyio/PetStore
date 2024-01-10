import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { LoginDto } from "src/auth/auth-dto/login.dto";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor (){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey :"THIS IS MY APP SECRET",
        });
    }
    async login(payload:LoginDto){
        return {
            Email: payload.Email,
            Password: payload.Password
        }
    }
}