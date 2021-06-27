import { Controller, Get, Param, Query, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe, UsePipes, Body } from '@nestjs/common';
import { JoiValidationPipe } from '../../../../pipe/joi-validation.pipe'
import { UsersService } from './../../services/users/users.service';
import { createUserSchema } from './../../../../schemas/user.schema';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(createUserSchema))
    async create(@Body() payload: any): Promise<object> {
        const { username, email, password } = payload
        let newElement = await this.usersService.create(username, email, password)

        return { msg: "created" };
    }


    /*@Get(":id")
    @HttpCode(HttpStatus.FOUND)
    async get(@Param("id", ParseIntPipe) id: number): Promise<object> {
        return { data: await this.languageService.get(id) }
    }*/
    /**/
        @Get()
        @HttpCode(HttpStatus.FOUND)
        async list(@Query() params: any): Promise<object> {
            return { data: await this.usersService.list(params) }
        }/*
        
        @Put(":id")
        @HttpCode(HttpStatus.ACCEPTED)
        async update(@Param("id", ParseIntPipe) id: number, @Body(new JoiValidationPipe(createUserSchema)) payload: any): Promise<object> {
            return { msg: "updated", data: await this.usersService.update(id, payload) }
        }
    
        @Delete(":id")
        @HttpCode(HttpStatus.OK)
        async delete(@Param("id", ParseIntPipe) id: number): Promise<object> {
            let deleted = await this.usersService.delete(id)
            return { msg: "deleted" }
        }
        */
}

