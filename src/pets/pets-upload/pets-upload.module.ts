import { Module } from '@nestjs/common';
import { PetsUploadController } from './pets-upload.controller';
import { PetsUploadService } from './pets-upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { PetModule } from '../pets.module';

@Module({
    imports:[
      MulterModule.register({
        dest: './uploadedFiles'
      }),
      
    ],
  controllers: [PetsUploadController],
  providers: [PetsUploadService]
})
export class PetsUploadModule {}
