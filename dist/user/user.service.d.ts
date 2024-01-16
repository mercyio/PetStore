import { ProfileDto } from 'src/auth/dto/profile.dto';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
import { ProfileEntity } from 'src/auth/entities/profile.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepo;
    private profileRepo;
    constructor(userRepo: Repository<UserEntity>, profileRepo: Repository<ProfileEntity>);
    createProfile(payload: ProfileDto): Promise<ProfileDto & ProfileEntity>;
    updateProfile(id: string, payload: UpdateProfileDto): Promise<void>;
    findOne(id: number): string;
    remove(id: number): string;
}
