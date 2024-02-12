/// <reference types="passport" />
import { UserService } from './user.service';
import { ProfileDto } from 'src/dto/profile.dto';
import { Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<Express.User>;
    profile(payload: ProfileDto, req: Request): Promise<"profile has already been created, update profile to make changes" | {
        message: string;
        result: import("../entities/profile.entity").ProfileEntity;
    }>;
    updateProfile(payload: ProfileDto, req: Request): Promise<{
        success: boolean;
        message: string;
        updatedProfile: import("typeorm").UpdateResult;
    }>;
    getUsers(): Promise<import("../auth/serializer/users.serialize").SerializeUsers[]>;
    user(req: Request): Promise<import("../entities/profile.entity").ProfileEntity>;
}
