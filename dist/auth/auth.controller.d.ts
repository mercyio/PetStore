import { AuthService } from "./auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { SignupDto } from "src/auth/dto/signup.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(payload: LoginDto): Promise<{
        accessToken: string;
    }>;
    signupUser(payload: SignupDto): Promise<any>;
    getProfile(req: any): Promise<any>;
    refreshToken(payload: any): Promise<{
        accessToken: string;
    }>;
}
