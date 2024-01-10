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


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
     petModule, 
      PassportModule,
       JwtModule.register({
        global: true,
        secret: "THIS IS MY APP SECRET",
        signOptions: {expiresIn : '20s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
