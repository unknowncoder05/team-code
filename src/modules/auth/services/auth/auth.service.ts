import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

import { UsersService } from './../../../users/services/users/users.service'


@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email)
        if (!user) {
            return null
        }
        const match = await bcrypt.compare(password, user.password)
        if (user && match) {
            const { password, ...res} = user
            return res
        }
        return null
    }
    generateJWT(user) {
        const payload = { id: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          user,
        };
      }
}
