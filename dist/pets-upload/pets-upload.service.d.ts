/// <reference types="multer" />
export declare class PetsUploadService {
    uploadPets(petFiles: Express.Multer.File): {
        statusCode: number;
        fileName: string;
        fileSize: number;
        message: string;
    };
}
