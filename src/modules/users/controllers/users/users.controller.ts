import { Controller, Get, Param, Query, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe, UsePipes, Body, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from '../../../../pipe/joi-validation.pipe'
import { UsersService } from './../../services/users/users.service';
import { createUserSchema } from './../../../../schemas/user.schema';


import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from '../../../../modules/auth/guards/roles.guard'
import { Public } from '../../../../modules/auth/decorators/public.decorator'
import { Roles } from '../../../../modules/auth/decorators/roles.decorator'
import { Role } from '../../../../entities/user.entity'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(createUserSchema))
    async create(@Body() payload: any): Promise<object> {
        const { username, email, password } = payload
        let newElement = await this.usersService.create(username, email, password)

        return { msg: "created" };
    }


    @Get(":id")
    @HttpCode(HttpStatus.FOUND)
    @Roles(Role.ADMIN)
    async get(@Param("id", ParseIntPipe) id: number): Promise<object> {
        return { data: await this.usersService.get(id) }
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    @Roles(Role.ADMIN)
    async list(@Query() params: any): Promise<object> {
        return { data: await this.usersService.list(params) }
    }
        
    @Put(":id")
    @HttpCode(HttpStatus.ACCEPTED)
    @Roles(Role.ADMIN)
    async update(@Param("id", ParseIntPipe) id: number, @Body(new JoiValidationPipe(createUserSchema)) payload: any): Promise<object> {
        return { msg: "updated", data: await this.usersService.update(id, payload) }
    }
    
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN)
    async delete(@Param("id", ParseIntPipe) id: number): Promise<object> {
        let deleted = await this.usersService.delete(id)
        return { msg: "deleted" }
    }
    
}

