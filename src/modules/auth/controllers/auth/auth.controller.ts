import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../services/auth/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        return this.authService.generateJWT(req.user);
    }
}
