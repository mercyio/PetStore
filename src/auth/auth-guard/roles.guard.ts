import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private Authservice:AuthService){}

    canActivate(contex: ExecutionContext): boolean{
        // required role
        const requireRoles = this.reflector.getAllAndOverride<Role[]> ('roles', [
        contex.getHandler(),
        contex.getClass(),
    ]);
     if(!requireRoles){
        return true;
     }
     
     // check if the user has required role
     const request = contex.switchToHttp().getRequest();

    //  return requireRoles.some((role) => user.roles.includes(role));
    }
}