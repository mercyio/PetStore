import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { SignupDto } from 'src/auth/dto/signup.dto';
export declare class AuthService {
    private UserEntity;
    private jwtService;
    constructor(UserEntity: Repository<UserEntity>, jwtService: JwtService);
    signup(payload: SignupDto): Promise<any>;
    login(Email: string, Password: string): Promise<{
        accessToken: string;
    }>;
    user(Email: string): Promise<UserEntity>;
}
