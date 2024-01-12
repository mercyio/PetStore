import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { petModule } from 'src/Pets/pets.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { jwtConstants } from './constants/jwtConstant';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
     petModule, 
      PassportModule,
       JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn : '5m'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard
  ],
  exports: [AuthService,],
})
export class AuthModule {}

