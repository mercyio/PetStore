import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { APP_GUARD } from '@nestjs/core';
// import {RoleGuard} from '../auth/auth-guard/roles.guard'

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // }
  ],
})
export class UserModule {}
