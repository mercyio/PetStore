import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PetsUploadService } from './pets-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('pets-upload')
export class PetsUploadController {
    constructor( private petsUploadService: PetsUploadService){}

    @Post()
    @UseInterceptors(FilesInterceptor('pets', 6))
    async petsUpload(
         @UploadedFiles(
        new ParseFilePipe({
            validators: [
             new MaxFileSizeValidator({
                maxSize: 10000000
             }), 
             new FileTypeValidator({
                fileType:'image/png'
             })
            ]
        })
    ) payload){
        return await this.petsUploadService.uploadPets(payload)
    }
}
