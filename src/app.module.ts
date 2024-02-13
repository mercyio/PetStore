import { Module } from '@nestjs/common';
import { PetModule } from './Pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { PetsUploadModule } from './Pets/pets-upload/pets-upload.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
// import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PetModule,
    // UserModule,
    PetsUploadModule,
    AuthModule,
    DatabaseModule,
  ],
  
    // controllers: [],
    // providers: []
    // providers: [AppService],
})
export class AppModule {}
