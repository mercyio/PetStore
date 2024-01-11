import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { petModule } from 'src/Pets/pets.module';
import { LocalStrategy } from 'src/auth/auth-strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/auth-strategies/jwt.strategy';
import { UserEntity } from 'src/auth/auth-entities/user.entity';
import { jwtAuthGuard, jwtConstants } from './auth-guard/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth-guard/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
     petModule, 
      PassportModule,
       JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn : '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}

