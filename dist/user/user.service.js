"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_dto_1 = require("../dto/profile.dto");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../entities/user.entity");
const users_serialize_1 = require("../auth/serializer/users.serialize");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepo, profileRepo) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
    }
    async GetAllusers() {
        const Users = await this.userRepo.find();
        const serializeAllUsers = Users.map((users) => new users_serialize_1.SerializeUsers(users));
        return serializeAllUsers;
    }
    async getUser(req) {
        const users = req.user;
        const name = users['userName'];
        const user = await this.profileRepo.findOne({ where: { userName: name } });
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        return user;
    }
    async createProfile(payload, req) {
        try {
            const user = req.user;
            const id = user['userId'];
            const findUser = await this.userRepo.findOne({ where: { userId: id } });
            if (!findUser) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const profile = await this.profileRepo.create({ ...payload, user });
            findUser.profile = profile;
            const savedprofile = await this.profileRepo.save(profile);
            return {
                message: 'Successfully created',
                result: savedprofile,
            };
        }
        catch (error) {
            return 'profile has already been created, update profile to make changes';
        }
    }
    async updateprofile(payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const finduser = await this.userRepo.findOne({ where: { userId }, relations: ['profile'] });
        if (!finduser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!finduser.profile) {
            throw new common_1.HttpException('no existing profile found, create a new profile', common_1.HttpStatus.NOT_FOUND);
        }
        const updateProfile = await this.profileRepo
            .createQueryBuilder()
            .update(profile_entity_1.ProfileEntity)
            .where('user_id = :userId', { userId })
            .set(payload)
            .execute();
        if (updateProfile.affected === 0) {
            throw new common_1.NotFoundException('Profile not found or not updated');
        }
        const updatedProfile = updateProfile;
        console.log(updatedProfile);
        return {
            success: true,
            message: 'Successfully updated profile',
            updatedProfile,
        };
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getUser", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "createProfile", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updateprofile", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map