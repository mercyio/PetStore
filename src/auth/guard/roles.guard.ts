import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enum/roles.enum";
import { ROLES_KEY } from "../rolesDecorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // const request = context.switchToHttp().getRequest();

        // const user = request
    
      const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (requireRoles){
        return true;
      }
      const {user} = context.switchToHttp().getRequest();
 
      return requireRoles.some((role) => user.roles?.includes(role));
    }
}