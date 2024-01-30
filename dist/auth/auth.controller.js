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
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const auth_guard_1 = require("./guard/auth.guard");
const roles_guard_1 = require("./guard/roles.guard");
const roles_decorator_1 = require("./decorator/roles.decorator");
const roles_enum_1 = require("./enum/roles.enum");
const profile_dto_1 = require("./dto/profile.dto");
const swagger_1 = require("@nestjs/swagger");
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
    async createProfile(userName) {
        return await this.authService.createProfile(userName);
    }
    async updateProfile(userName, payload) {
        return await this.authService.updateProfile(userName, payload);
    }
    async getUsers() {
        return await this.authService.GetAllusers();
    }
    async user(userName) {
        return await this.authService.getUser(userName);
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
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('createprofile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createProfile", null);
__decorate([
    (0, common_1.Patch)('updateprofile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, profile_dto_1.ProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':userName'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map