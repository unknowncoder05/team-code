import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '../../services/auth/auth.service';
//import {UserModule}
@Module({
    imports: [PassportModule],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
