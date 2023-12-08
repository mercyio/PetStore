import { PetsUploadService } from './pets-upload.service';
export declare class PetsUploadController {
    private petsUploadService;
    constructor(petsUploadService: PetsUploadService);
    petsUpload(payload: any): Promise<{
        statusCode: number;
        fileName: string;
        fileSize: number;
        message: string;
    }>;
}
