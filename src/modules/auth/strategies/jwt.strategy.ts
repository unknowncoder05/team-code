import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './../services/auth/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
          });
    }

    async validate(email: string, password: string) {
        const user = this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('not allow');
        }
        return user;
    }
}