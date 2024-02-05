import { ProfileDto } from '../dto/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserEntity } from '../entities/user.entity';
import { SerializeUsers } from '../auth/serializer/users.serialize';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class UserService {
    private userRepo;
    private profileRepo;
    constructor(userRepo: Repository<UserEntity>, profileRepo: Repository<ProfileEntity>);
    GetAllusers(): Promise<SerializeUsers[]>;
    getUser(req: Request): Promise<ProfileEntity>;
    createProfile(payload: ProfileDto, req: Request): Promise<"profile has already been created, update profile to make changes" | {
        message: string;
        result: ProfileEntity;
    }>;
    updateprofile(payload: ProfileDto, req: Request): Promise<{
        success: boolean;
        message: string;
        updatedProfile: import("typeorm").UpdateResult;
    }>;
}
