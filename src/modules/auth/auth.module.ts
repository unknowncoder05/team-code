import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UsersModule } from './../users/users.module';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { RolesGuard } from './guards/roles.guard'
import config from './../../config';

//import {UserModule}
@Module({
    imports: [
        UsersModule,
        PassportModule, 
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                    return {
                        secret: configService.jwt.secret,
                        signOptions: {
                            expiresIn: '300s',
                        },
                    };
                }
            })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard],
    controllers: [AuthController],
    exports: [ RolesGuard ]
})
export class AuthModule { }
