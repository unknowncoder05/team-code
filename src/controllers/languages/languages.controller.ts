import { Controller, Get, Param, Query, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe, UsePipes, Body } from '@nestjs/common';
import { JoiValidationPipe } from '../../pipe/joi-validation.pipe'
import { LanguageService } from './../../services/language/language.service';
import { languageSchema } from './../../schemas/language.schema';
@Controller('language')
export class LanguagesController {
    constructor(private languageService: LanguageService) { }
    @Get(":id")
    @HttpCode(HttpStatus.FOUND)
    async get(@Param("id", ParseIntPipe) id: number): Promise<object> {
        return { data: await this.languageService.get(id) }
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    async list(@Query() params: any): Promise<object> {
        return { data: await this.languageService.list(params) }
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(languageSchema))
    async create(@Body() payload: any): Promise<object> {
        const { name } = payload
        let newProduct = await this.languageService.create(name)

        return { msg: "created", data: newProduct };
    }
    @Put(":id")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Param("id", ParseIntPipe) id: number, @Body(new JoiValidationPipe(languageSchema)) payload: any): Promise<object> {
        return { msg: "updated", data: await this.languageService.update(id, payload) }
    }
    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    async delete(@Param("id", ParseIntPipe) id: number): Promise<object> {
        let deleted = await this.languageService.delete(id)
        return { msg: "deleted" }
    }
}
