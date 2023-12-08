"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsUploadModule = void 0;
const common_1 = require("@nestjs/common");
const pets_upload_controller_1 = require("./pets-upload.controller");
const pets_upload_service_1 = require("./pets-upload.service");
const platform_express_1 = require("@nestjs/platform-express");
let PetsUploadModule = class PetsUploadModule {
};
exports.PetsUploadModule = PetsUploadModule;
exports.PetsUploadModule = PetsUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploadedFiles'
            })
        ],
        controllers: [pets_upload_controller_1.PetsUploadController],
        providers: [pets_upload_service_1.PetsUploadService]
    })
], PetsUploadModule);
//# sourceMappingURL=pets-upload.module.js.map