import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth-entities/user.entity';
import { SignupDto } from 'src/auth-dto/signup.dto';
import { LoginDto } from 'src/auth-dto/login.dto';
export declare class AuthService {
    private UserEntity;
    private jwtService;
    constructor(UserEntity: Repository<UserEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<{
        Password: string;
        userName: string;
        Email: string;
        PhoneNumber: string;
    } & UserEntity>;
    login(payload: LoginDto, Email: string, Password: string): Promise<{
        accessToken: string;
    }>;
}
