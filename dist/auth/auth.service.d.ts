import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SerializeUsers } from './serializer/users';
import { ProfileEntity } from './entities/profile.entity';
export declare class AuthService {
    private userRepo;
    private profileRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, profileRepo: Repository<ProfileEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<any>;
    login(Email: string, Password: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    GetAllusers(): Promise<SerializeUsers[]>;
}
