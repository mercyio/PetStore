import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/auth-entities/user.entity';
import { SignupDto } from 'src/auth/auth-dto/signup.dto';
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
    login(Email: string, Password: string): Promise<{
        accessToken: string;
    }>;
}
