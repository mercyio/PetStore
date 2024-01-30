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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetEntity = void 0;
const user_entity_1 = require("../../auth/entities/user.entity");
const typeorm_1 = require("typeorm");
let PetEntity = class PetEntity {
};
exports.PetEntity = PetEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PetEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PetEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PetEntity.prototype, "petType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PetEntity.prototype, "colour", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PetEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PetEntity.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PetEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.pet),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], PetEntity.prototype, "user", void 0);
exports.PetEntity = PetEntity = __decorate([
    (0, typeorm_1.Entity)('pets')
], PetEntity);
//# sourceMappingURL=pets.entity.js.map