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
exports.PetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const pets_entity_1 = require("./pet-entity/pets.entity");
let PetService = class PetService {
    constructor(petRepo) {
        this.petRepo = petRepo;
    }
    async createPet(payload) {
        return await this.petRepo.save(payload);
    }
    async getPet(id) {
        const GetPet = await this.petRepo.findOne({ where: { id: id } });
        if (!GetPet) {
            throw new common_1.HttpException(`PLS INPUT THE CORRECT ID`, 400);
        }
        return GetPet;
    }
    async getAllPets() {
        return await this.petRepo.find();
    }
    async updatePet(id, payload) {
        const petUpdate = await this.petRepo.update(id, payload);
        if (!petUpdate) {
            throw new common_1.HttpException(" wrong update request", 400);
        }
        return petUpdate;
    }
    async deletePet(id) {
        return await this.petRepo.delete(id);
    }
};
exports.PetService = PetService;
exports.PetService = PetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pets_entity_1.PetEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PetService);
//# sourceMappingURL=pets.service.js.map