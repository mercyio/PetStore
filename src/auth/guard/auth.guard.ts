import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthGuard implements CanActivate{
   constructor(private jwtService: JwtService, private configService: ConfigService){}
   
   async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); 

    if(!token){
        throw new UnauthorizedException("ACCESS TOKEN IS MISSING");
    }
    try{
        const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
          });
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
