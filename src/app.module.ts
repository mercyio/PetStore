import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pets/entity/pets.entity';
import { petModule } from './pets/pets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        entities: [PetEntity],
        synchronize: configService.getOrThrow('DB_SYNC'),
      }),
      inject: [ConfigService]
    
    }),
    petModule
  ],
  //  module: [petModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
