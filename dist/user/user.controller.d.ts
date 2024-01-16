import { UserService } from './user.service';
import { ProfileDto } from 'src/auth/dto/profile.dto';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    CreateProfile(payload: ProfileDto): Promise<ProfileDto & import("../auth/entities/profile.entity").ProfileEntity>;
    user: any;
    UpdateProfile(id: string, payload: UpdateProfileDto): Promise<void>;
    findOne(id: string): string;
    remove(id: string): string;
}
