/// <reference types="passport" />
import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
import { Request, Response } from "express";
import { ProfileDto } from "./dto/profile.dto";
import { createPetsDto } from "src/Pets/pet-dto/create-pet.dto";
import { OrderDto } from "./dto/order.dto";
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
    profile(payload: ProfileDto, req: Request): Promise<"profile has already been created, update profile to make changes" | {
        message: string;
        result: import("./entities/profile.entity").ProfileEntity;
    }>;
    updateProfile(payload: ProfileDto, req: Request): Promise<{
        success: boolean;
        message: string;
        updatedProfile: import("typeorm").UpdateResult;
    }>;
    getUsers(): Promise<import("./serializer/users.serialize").SerializeUsers[]>;
    user(req: Request): Promise<import("./entities/profile.entity").ProfileEntity>;
    ownersPet(payload: createPetsDto, req: Request): Promise<{
        message: string;
        pets: any[];
    }>;
    UsersOrder(payload: OrderDto, req: Request): Promise<any>;
}
