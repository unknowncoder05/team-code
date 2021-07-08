import { CanActivate, ExecutionContext, Injectable, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator'
import { Role } from '../../../entities/user.entity'
import { UsersService } from '../../users/services/users/users.service'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UsersService, private reflector: Reflector) {
  }

  async canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles =  this.reflector.get(ROLE_KEY, context.getHandler())
    const request = context.switchToHttp().getRequest();
    const userId = request.id
    const user = await this.userService.get(userId)
    if(user.role == Role.ADMIN) return true
    if(roles.some(item => item === user.role)) return true
    throw new ForbiddenException('not enough privilages')
  }
}
