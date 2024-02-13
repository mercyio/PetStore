"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetModule = void 0;
const common_1 = require("@nestjs/common");
const pets_service_1 = require("./pets.service");
const pets_controller_1 = require("./pets.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pets_entity_1 = require("../entities/pets.entity");
const user_entity_1 = require("../entities/user.entity");
const auth_guard_1 = require("../auth/guard/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const profile_entity_1 = require("../entities/profile.entity");
const pets_upload_module_1 = require("./pets-upload/pets-upload.module");
let PetModule = class PetModule {
};
exports.PetModule = PetModule;
exports.PetModule = PetModule = __decorate([
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
            }),
            pets_upload_module_1.PetsUploadModule
        ],
        providers: [pets_service_1.PetService, auth_guard_1.AuthGuard],
        controllers: [pets_controller_1.PetController],
        exports: [pets_service_1.PetService, auth_guard_1.AuthGuard]
    })
], PetModule);
//# sourceMappingURL=pets.module.js.map