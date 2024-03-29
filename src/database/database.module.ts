import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PetEntity } from '../entities/pets.entity';
// // import { PetModule } from '../Pets/pets.module';
// import { ProfileEntity } from '../entities/profile.entity';
// import { UserEntity } from '../entities/user.entity';
// // import { UserModule } from 'src/user/user.module';
// // import { PostEntity } from 'src/entities/post.entity';
// // import { CategoryEntity } from 'src/auth/entities/category.entity';
// import { OrderEntity } from '../entities/order.entity';
// import { ReviewEntity } from '../entities/review.entity';
import { dataSourceOptions } from 'config/typeorm';


@Module({
    imports:[
      
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot(dataSourceOptions),
      
        // TypeOrmModule.forRootAsync({
        //     useFactory: (configService: ConfigService) => ({
        //       type: 'mysql',
        //       host: configService.getOrThrow('DB_HOST'),
        //       port: configService.getOrThrow('DB_PORT'),
        //       username: configService.getOrThrow('DB_USER'),
        //       password: configService.getOrThrow('DB_PASSWORD'),
        //       database: configService.getOrThrow('DB_DATABASE'),
        //       entities: [PetEntity, UserEntity, ProfileEntity, OrderEntity, ReviewEntity],
        //       synchronize: configService.getOrThrow('DB_SYNC'),
        //     }),
        //     inject: [ConfigService]
          
        //   }),
          // PetModule,
      
        //   // UserModule
    ]
})
export class DatabaseModule {}
