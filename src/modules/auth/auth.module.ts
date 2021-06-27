import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth/auth.service';
//import {UserModule}
@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
