import { Module } from '@nestjs/common';
// import { PetModule } from './Pets/pets.module';
import { ConfigModule } from '@nestjs/config';
// import { PetsUploadModule } from './Pets/pets-upload/pets-upload.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // PetModule,
    // PetsUploadModule,
    AuthModule,
    DatabaseModule,
  ],
  
})
export class AppModule {}
