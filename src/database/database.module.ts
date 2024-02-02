import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from 'src/auth/entities/pets.entity';
import { PetModule } from 'src/Pets/pets.module';
import { ProfileEntity } from 'src/auth/entities/profile.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PostEntity } from 'src/auth/entities/post.entity';
// import { CategoryEntity } from 'src/auth/entities/category.entity';
import { OrderEntity } from 'src/auth/entities/order.entity';
import { ReviewEntity } from 'src/auth/entities/review.entity';

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
              entities: [PetEntity, UserEntity, ProfileEntity, PostEntity, OrderEntity, ReviewEntity],
              synchronize: configService.getOrThrow('DB_SYNC'),
            }),
            inject: [ConfigService]
          
          }),
          PetModule,
          UserModule
    ]
})
export class DatabaseModule {}
