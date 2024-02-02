import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SerializeUsers } from './serializer/users.serialize';
import { ProfileDto } from './dto/profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { createPetsDto } from 'src/Pets/pet-dto/create-pet.dto';
import { PetEntity } from './entities/pets.entity';
import { OrderDto } from './dto/order.dto';
export declare class AuthService {
    private userRepo;
    private profileRepo;
    private petRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, profileRepo: Repository<ProfileEntity>, petRepo: Repository<PetEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<any>;
    login(Email: string, Password: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    GetAllusers(): Promise<SerializeUsers[]>;
    getUser(req: Request): Promise<ProfileEntity>;
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
    petsOrder(payload: OrderDto, req: Request): Promise<any>;
}
