/// <reference types="passport" />
import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
import { Request, Response } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupUser(payload: SignupDto): Promise<any>;
    loginUser(payload: LoginDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    getProfile(req: Request): Promise<Express.User>;
    getUsers(): Promise<import("./entities/user.entity").UserEntity[]>;
}
