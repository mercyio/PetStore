import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth-dto/login.dto";
import { SignupDto } from "src/auth-dto/signup.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(Email: string, Password: string, payload: LoginDto): Promise<{
        accessToken: string;
    }>;
    signupUser(payload: SignupDto): Promise<{
        Password: string;
        userName: string;
        Email: string;
        PhoneNumber: string;
    } & import("../auth-entities/user.entity").UserEntity>;
    getProfile(payload: LoginDto): string;
    refreshToken(Email: string, Password: string, payload: LoginDto): Promise<{
        accessToken: string;
    }>;
}
