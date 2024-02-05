import { JwtService } from '@nestjs/jwt';
import { OrderDto } from '../dto/order.dto';
import { createPetsDto } from '../dto/pet-dto/create-pet.dto';
import { ProfileDto } from '../dto/profile.dto';
import { SignupDto } from '../dto/signup.dto';
import { PetEntity } from '../entities/pets.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { SerializeUsers } from './serializer/users.serialize';
import { Request, Response } from "express";
import { reviewDto } from 'src/dto/review.dto';
import { ReviewEntity } from 'src/entities/review.entity';
import { OrderEntity } from 'src/entities/order.entity';
export declare class AuthService {
    private userRepo;
    private profileRepo;
    private petRepo;
    private orderRepo;
    private reviewRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, profileRepo: Repository<ProfileEntity>, petRepo: Repository<PetEntity>, orderRepo: Repository<OrderEntity>, reviewRepo: Repository<ReviewEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<any>;
    login(Email: string, Password: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    GetAllusers(): Promise<SerializeUsers[]>;
    getUser(req: Request): Promise<ProfileEntity>;
    getUserbyId(req: Request): Promise<UserEntity>;
    createProfile(payload: ProfileDto, req: Request): Promise<"profile has already been created, update profile to make changes" | {
        message: string;
        result: ProfileEntity;
    }>;
    updateprofile(payload: ProfileDto, req: Request): Promise<{
        success: boolean;
        message: string;
        updatedProfile: import("typeorm").UpdateResult;
    }>;
    petOwned(payload: createPetsDto, req: Request): Promise<{
        message: string;
        pets: any[];
    }>;
    petsOrder(payload: OrderDto, req: Request): Promise<void>;
    review(id: string, payload: reviewDto, req: Request): Promise<ReviewEntity>;
}
