import { Repository } from 'typeorm';
import { UserEntity } from '../auth/entities/user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserEntity;
    private jwtService;
    constructor(UserEntity: Repository<UserEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<any>;
    login(Email: string, Password: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Promise<{
        clearCookie: Response<any, Record<string, any>>;
        response: Response<any, Record<string, any>>;
    }>;
    Allusers(): Promise<UserEntity[]>;
}
