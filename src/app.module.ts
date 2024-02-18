import { Module } from '@nestjs/common';
// import { PetModule } from './Pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { PetsUploadModule } from './Pets/pets-upload/pets-upload.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
// import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // PetModule,
    // PetsUploadModule,
    AuthModule,
    DatabaseModule,

    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     transport: {
    //       service: 'gmail',
    //       auth: {
    //         user: configService.getOrThrow("EMAIL_USER"),
    //         pass: configService.getOrThrow("EMAIL_SECRET"),
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
// }),
  ],
  
})
export class AppModule {}
