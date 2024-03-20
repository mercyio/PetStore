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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./guard/auth.guard");
const roles_decorator_1 = require("./decorator/roles.decorator");
const roles_enum_1 = require("./enum/roles.enum");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("../dto/login.dto");
const order_dto_1 = require("../dto/order.dto");
const create_pet_dto_1 = require("../dto/pet-dto/create-pet.dto");
const profile_dto_1 = require("../dto/profile.dto");
const signup_dto_1 = require("../dto/signup.dto");
const review_dto_1 = require("../dto/review.dto");
const block_guard_1 = require("./guard/block.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signupUser(payload) {
        const user = await this.authService.signup(payload);
        return user;
    }
    async loginUser(payload, req, res) {
        const accessToken = await this.authService.login(payload.Email, payload.Password, req, res);
        return accessToken;
    }
    async logout(req, res) {
        return await this.authService.logout(req, res);
    }
    async getProfile(req) {
        return req.user;
    }
    async profile(payload, req) {
        return await this.authService.createProfile(payload, req);
    }
    async updateProfile(payload, req) {
        return await this.authService.updateprofile(payload, req);
    }
    async getUsers() {
        return await this.authService.GetAllusers();
    }
    async user(req) {
        return await this.authService.getUser(req);
    }
    async blockuser(userId) {
        return await this.authService.blockUser(userId);
    }
    async ownersPet(payload, req) {
        return await this.authService.petOwned(payload, req);
    }
    async reviews(id, payload, req) {
        return await this.authService.review(id, payload, req);
    }
    async userswihpet(id, payload, req) {
        return await this.authService.userswithpet(id, payload, req);
    }
    async order(id, payload, req) {
        return await this.authService.createOrder(id, payload, req);
    }
    async userPet(id, payload, req) {
        return await this.authService.Order(id, payload, req);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiCreatedResponse)({ description: "User Signup/Registeration" }),
    (0, swagger_1.ApiBody)({ type: signup_dto_1.SignupDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiCreatedResponse)({ description: "User Signup/Registeration" }),
    (0, swagger_1.ApiBody)({ type: signup_dto_1.SignupDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Invalid credentials" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('myprofile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, block_guard_1.BlockGuard),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('createprofile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, block_guard_1.BlockGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
__decorate([
    (0, common_1.Patch)('updateprofile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, block_guard_1.BlockGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_dto_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('finduser'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, block_guard_1.BlockGuard),
    __param(0, (0, common_1.Body)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('block/:userId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, block_guard_1.BlockGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.admin, roles_enum_1.Role.vendor),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "blockuser", null);
__decorate([
    (0, common_1.Post)('createVendorPet'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.vendor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pet_dto_1.createPetsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ownersPet", null);
__decorate([
    (0, common_1.Post)('review/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_dto_1.reviewDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reviews", null);
__decorate([
    (0, common_1.Post)('user-pet/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_pet_dto_1.createPetsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userswihpet", null);
__decorate([
    (0, common_1.Post)('createorder/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "order", null);
__decorate([
    (0, common_1.Post)('bid/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.OrderDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userPet", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map