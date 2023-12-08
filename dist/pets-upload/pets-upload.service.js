"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsUploadService = void 0;
const common_1 = require("@nestjs/common");
let PetsUploadService = class PetsUploadService {
    uploadPets(petFiles) {
        const storage = {
            statusCode: 201,
            fileName: petFiles.originalname,
            fileSize: petFiles.size,
            message: 'congratulations! file has been sucessfully uploaded'
        };
        return storage;
    }
};
exports.PetsUploadService = PetsUploadService;
exports.PetsUploadService = PetsUploadService = __decorate([
    (0, common_1.Injectable)()
], PetsUploadService);
//# sourceMappingURL=pets-upload.service.js.map