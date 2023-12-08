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
exports.PetsUploadController = void 0;
const common_1 = require("@nestjs/common");
const pets_upload_service_1 = require("./pets-upload.service");
const platform_express_1 = require("@nestjs/platform-express");
let PetsUploadController = class PetsUploadController {
    constructor(petsUploadService) {
        this.petsUploadService = petsUploadService;
    }
    async petsUpload(payload) {
        return await this.petsUploadService.uploadPets(payload);
    }
};
exports.PetsUploadController = PetsUploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('pets', 6)),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 10000000
            }),
            new common_1.FileTypeValidator({
                fileType: 'image/png'
            })
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PetsUploadController.prototype, "petsUpload", null);
exports.PetsUploadController = PetsUploadController = __decorate([
    (0, common_1.Controller)('pets-upload'),
    __metadata("design:paramtypes", [pets_upload_service_1.PetsUploadService])
], PetsUploadController);
//# sourceMappingURL=pets-upload.controller.js.map