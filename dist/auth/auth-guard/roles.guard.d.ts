import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "src/auth/auth.service";
export declare class RoleGuard implements CanActivate {
    private reflector;
    private Authservice;
    constructor(reflector: Reflector, Authservice: AuthService);
    canActivate(contex: ExecutionContext): boolean;
}
