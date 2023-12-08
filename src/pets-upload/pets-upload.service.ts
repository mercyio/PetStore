import { FileTypeValidator, Injectable, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';


@Injectable()
export class PetsUploadService {
    
     uploadPets(
       
        petFiles: Express.Multer.File
     ){
        const storage = {
          statusCode: 201,
          fileName: petFiles.originalname,
          fileSize: petFiles.size,
          message: 'congratulations! file has been sucessfully uploaded'
        }
       
        return  storage
        
     }
        
     }


