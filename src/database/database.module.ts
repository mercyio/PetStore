import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from 'src/Pets/pet-entity/pets.entity';
import { PetModule } from 'src/Pets/pets.module';
import { profileEntity } from 'src/auth/entities/profile.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.getOrThrow('DB_HOST'),
              port: configService.getOrThrow('DB_PORT'),
              username: configService.getOrThrow('DB_USER'),
              password: configService.getOrThrow('DB_PASSWORD'),
              database: configService.getOrThrow('DB_DATABASE'),
              entities: [PetEntity, UserEntity, profileEntity],
              synchronize: configService.getOrThrow('DB_SYNC'),
            }),
            inject: [ConfigService]
          
          }),
          PetModule
    ]
})
export class DatabaseModule {}
