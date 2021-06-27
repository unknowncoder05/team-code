import { Injectable } from '@nestjs/common'
import { UsersService } from './../../../users/services/users/users.service'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getByEmail(email)
        if (!user) {
            return null
        }
        const match = await bcrypt.compare(password, user.password)
        if (user) {
            return user
        }
        return null
    }
}
