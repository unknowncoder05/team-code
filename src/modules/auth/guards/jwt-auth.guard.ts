import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport'

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC, true);


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(ctx: ExecutionContext){
    const isPublic = this.reflector.get(IS_PUBLIC, ctx.getHandler())
    
    if(isPublic){
      return true
    }
    return super.canActivate(ctx)
  }
}
