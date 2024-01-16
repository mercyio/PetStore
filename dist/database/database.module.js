"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const pets_entity_1 = require("../Pets/pet-entity/pets.entity");
const pets_module_1 = require("../Pets/pets.module");
const profile_entity_1 = require("../auth/entities/profile.entity");
const user_entity_1 = require("../auth/entities/user.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.getOrThrow('DB_HOST'),
                    port: configService.getOrThrow('DB_PORT'),
                    username: configService.getOrThrow('DB_USER'),
                    password: configService.getOrThrow('DB_PASSWORD'),
                    database: configService.getOrThrow('DB_DATABASE'),
                    entities: [pets_entity_1.PetEntity, user_entity_1.UserEntity, profile_entity_1.profileEntity],
                    synchronize: configService.getOrThrow('DB_SYNC'),
                }),
                inject: [config_1.ConfigService]
            }),
            pets_module_1.PetModule
        ]
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map