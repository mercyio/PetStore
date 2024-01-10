"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const pets_module_1 = require("./Pets/pets.module");
const config_1 = require("@nestjs/config");
const pets_upload_module_1 = require("./Pets/pets-upload/pets-upload.module");
const typeorm_1 = require("@nestjs/typeorm");
const pets_entity_1 = require("./Pets/pet-entity/pets.entity");
const auth_module_1 = require("./auth/auth.module");
const auth_controller_1 = require("./auth/auth.controller");
const user_entity_1 = require("./auth/auth-entities/user.entity");
const user_module_1 = require("./user/user.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./user/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.getOrThrow('DB_HOST'),
                    port: configService.getOrThrow('DB_PORT'),
                    username: configService.getOrThrow('DB_USER'),
                    password: configService.getOrThrow('DB_PASSWORD'),
                    database: configService.getOrThrow('DB_DATABASE'),
                    entities: [pets_entity_1.PetEntity, user_entity_1.UserEntity],
                    synchronize: configService.getOrThrow('DB_SYNC'),
                }),
                inject: [config_1.ConfigService]
            }),
            pets_module_1.petModule,
            pets_upload_module_1.PetsUploadModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RoleGuard,
            },
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map