"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const pets_entity_1 = require("../Pets/pet-entity/pets.entity");
const profile_entity_1 = require("../auth/entities/profile.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const auth_guard_1 = require("../auth/guard/auth.guard");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pets_entity_1.PetEntity, user_entity_1.UserEntity, profile_entity_1.ProfileEntity]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: {
                        algorithm: configService.getOrThrow('JWT_ALGORITHM')
                    }
                }),
                inject: [config_1.ConfigService],
            })
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_guard_1.AuthGuard],
        exports: [user_service_1.UserService, auth_guard_1.AuthGuard]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map