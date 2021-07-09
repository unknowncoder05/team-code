import { CanActivate, ExecutionContext, Injectable, ForbiddenException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { Role } from '../../../entities/user.entity'
import { UsersService } from '../../users/services/users/users.service'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UsersService, private reflector: Reflector) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles =  this.reflector.get(ROLE_KEY, context.getHandler())
    const request = context.switchToHttp().getRequest();
    const reqUser = request.user
    if (!reqUser){
      const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
      if (isPublic) return true
      else return false
    }
    if (!roles) return false

    const user = await this.userService.get(reqUser.sub)
    if(user.role == Role.ADMIN) return true
    if(roles.some(item => item === user.role)) return true
    throw new ForbiddenException('not enough privilages')
  }
}
