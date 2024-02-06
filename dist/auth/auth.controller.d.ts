/// <reference types="passport" />
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { LoginDto } from "src/dto/login.dto";
import { OrderDto } from "src/dto/order.dto";
import { createPetsDto } from "src/dto/pet-dto/create-pet.dto";
import { ProfileDto } from "src/dto/profile.dto";
import { SignupDto } from "src/dto/signup.dto";
import { reviewDto } from "src/dto/review.dto";
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
        result: import("../entities/profile.entity").ProfileEntity;
    }>;
    updateProfile(payload: ProfileDto, req: Request): Promise<{
        success: boolean;
        message: string;
        updatedProfile: import("typeorm").UpdateResult;
    }>;
    getUsers(): Promise<import("./serializer/users.serialize").SerializeUsers[]>;
    user(req: Request): Promise<import("../entities/profile.entity").ProfileEntity>;
    ownersPet(payload: createPetsDto, req: Request): Promise<{
        message: string;
        savePet: import("../entities/pets.entity").PetEntity;
    }>;
    reviews(id: string, payload: reviewDto, req: Request): Promise<import("../entities/review.entity").ReviewEntity>;
    orders(payload: OrderDto, req: Request): Promise<{
        message: string;
        saveOrder: import("../entities/order.entity").OrderEntity;
    }>;
    order(id: string, payload: OrderDto, req: Request): Promise<import("../entities/order.entity").OrderEntity>;
}
