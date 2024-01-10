import { LoginDto } from "src/auth/auth-dto/login.dto";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    login(payload: LoginDto): Promise<{
        Email: string;
        Password: string;
    }>;
}
export {};
