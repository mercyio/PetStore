import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){}
export const jwtConstants = {
    secret: 'your-secret-key-here',
}