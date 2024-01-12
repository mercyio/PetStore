import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { jwtConstants } from "../constants/jwtConstant";


@Injectable()
export class AuthGuard implements CanActivate{
   constructor(private jwtService: JwtService){}
   
   async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); 

    if(!token){
        throw new UnauthorizedException("INPUT TOKEN");
    }
    try{
        const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
        request['user'] = payload;
        delete payload.Password;
    }
   catch{
    throw new UnauthorizedException('EXPIRED OR INVALID TOKEN');
   }
   return true;
}
private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
