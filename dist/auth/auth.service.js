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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const order_dto_1 = require("../dto/order.dto");
const create_pet_dto_1 = require("../dto/pet-dto/create-pet.dto");
const profile_dto_1 = require("../dto/profile.dto");
const pets_entity_1 = require("../entities/pets.entity");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const users_serialize_1 = require("./serializer/users.serialize");
const bcrypt = require("bcrypt");
const review_dto_1 = require("../dto/review.dto");
const review_entity_1 = require("../entities/review.entity");
const order_entity_1 = require("../entities/order.entity");
let AuthService = class AuthService {
    constructor(userRepo, profileRepo, petRepo, orderRepo, reviewRepo, jwtService) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
        this.petRepo = petRepo;
        this.orderRepo = orderRepo;
        this.reviewRepo = reviewRepo;
        this.jwtService = jwtService;
    }
    async signup(payload) {
        payload.Email = payload.Email.toLowerCase();
        const { Email, Password, ...rest } = payload;
        const userEmail = await this.userRepo.findOne({ where: { Email: Email } });
        if (userEmail) {
            throw new common_1.HttpException('EMAIL ALREADY EXIST', 400);
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltOrRounds);
        try {
            const user = await this.userRepo.save({ ...payload, Password: hashedPassword });
            await this.userRepo.save(user);
            delete user.Password;
            return user;
        }
        catch (err) {
            if (err.code === '22P02') {
                throw new common_1.BadRequestException('ADMIN ROLE SHOULD BE LOWERCASE');
            }
            return err;
        }
    }
    async login(Email, Password, req, res) {
        const findUser = await this.userRepo.findOne({ where: { Email } });
        if (!findUser) {
            throw new common_1.UnauthorizedException('INVALID CREDENTIALS');
        }
        const comparePassword = await bcrypt.compare(Password, findUser.Password);
        if (comparePassword !== true) {
            throw new common_1.UnauthorizedException("invalid credential");
        }
        const payload = {
            userId: findUser.userId,
            Email: findUser.Email,
            Password: findUser.Password,
            Role: findUser.role
        };
        const Token = await this.jwtService.sign(payload);
        res.cookie('isAuthenticated', Token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000
        });
        return res.send({
            success: true,
            message: `USER SUCCESSFULLY LOGGED-IN`,
            accessToken: Token
        });
    }
    async logout(req, res) {
        const clearCookie = res.clearCookie('isAuthenticated');
        const response = res.send(`user sucessfully logedout`);
        return {
            clearCookie,
            response
        };
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
    async getUserbyId(req) {
        const users = req.user;
        const userId = users['userId'];
        const user = await this.userRepo.findOne({ where: { userId } });
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
    async petOwned(payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const findUser = await this.userRepo.findOne({ where: { userId }, relations: ['pet'] });
        if (!findUser) {
            throw new common_1.NotFoundException('user not found');
        }
        const users = user;
        const ownedpets = await this.petRepo.create({ ...payload, users });
        const savePet = await this.petRepo.save(ownedpets);
        return {
            message: 'sucessful',
            savePet
        };
    }
    async review(id, payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const findUser = await this.userRepo.findOne({
            where: { userId },
            relations: ['pet'],
        });
        if (!findUser) {
            throw new common_1.HttpException('User or associated pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        const findpet = await this.petRepo.findOne({ where: { id } });
        const pet = findpet;
        const newReview = this.reviewRepo.create({ ...payload, pet, user });
        const savedReview = await this.reviewRepo.save(newReview);
        return savedReview;
    }
    async createOrder(id, payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const findUser = await this.userRepo.findOne({ where: { userId }, relations: ['order'] });
        if (!findUser) {
            throw new common_1.NotFoundException('user not found');
        }
        const findPet = await this.petRepo.findOne({ where: { id } });
        if (!findPet) {
            throw new common_1.HttpException('Pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        const pet = findPet;
        const order = this.orderRepo.create({ ...payload, user });
        const savedOrder = await this.orderRepo.save(order);
        return savedOrder;
    }
    async Order(id, payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const findUser = await this.userRepo.findOne({
            where: { userId },
            relations: ['pet'],
        });
        if (!findUser) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const findPet = await this.petRepo.findOne({ where: { id } });
        if (!findPet) {
            throw new common_1.HttpException('Pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        const pet = findPet;
        findUser.pet.push(findPet);
        const order = this.orderRepo.create({ ...payload, user });
        order.pet = findUser.pet;
        console.log(order);
        const savedOrder = await this.orderRepo.save(order);
        return savedOrder;
    }
    async userswithpet(id, payload, req) {
        const user = req.user;
        const userId = user['userId'];
        const findUser = await this.userRepo.findOne({
            where: { userId },
            relations: ['pet'],
        });
        if (!findUser) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const findPet = await this.petRepo.findOne({ where: { id } });
        if (!findPet) {
            throw new common_1.HttpException('Pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        const pet = findUser.pet;
        findUser.pet.push(findPet);
        const userspet = this.orderRepo.create({ ...payload, user, pet });
        console.log(userspet);
        const savedpet = await this.orderRepo.save(userspet);
        return savedpet;
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getUser", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getUserbyId", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createProfile", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "updateprofile", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pet_dto_1.createPetsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "petOwned", null);
__decorate([
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.reviewDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "review", null);
__decorate([
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createOrder", null);
__decorate([
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "Order", null);
__decorate([
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_pet_dto_1.createPetsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "userswithpet", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(pets_entity_1.PetEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map