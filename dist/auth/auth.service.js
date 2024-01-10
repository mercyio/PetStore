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
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./auth-entities/user.entity");
const bcrypt = require("bcrypt");
const signup_dto_1 = require("./auth-dto/signup.dto");
let AuthService = class AuthService {
    constructor(UserEntity, jwtService) {
        this.UserEntity = UserEntity;
        this.jwtService = jwtService;
    }
    async signup(payload) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(payload.Password, saltOrRounds);
        const user = await this.UserEntity.save({ ...payload, Password: hashedPassword });
        return user;
    }
    async login(Email, Password) {
        const findUser = await this.UserEntity.findOne({ where: { Email } });
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
            Password: findUser.Password
        };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signup", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map