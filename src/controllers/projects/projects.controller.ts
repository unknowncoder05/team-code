import {
    Controller, Get, Post, Param, Query, Body, Put, Delete, HttpStatus, HttpCode
    , ParseIntPipe, UsePipes
} from '@nestjs/common';
//import { Response } from "express"
import { JoiValidationPipe } from '../../pipe/joi-validation.pipe'
import { DatabaseService } from './../../services/database/database.service';
import { projectSchema } from './../../schemas/project.schema';


@Controller('project')
export class ProjectsController {
    constructor(private databaseService: DatabaseService) { }
    @Get(":projectID")
    @HttpCode(HttpStatus.FOUND)
    async get(@Param("projectID", ParseIntPipe) projectID: number): Promise<object> {
        return { data: await this.databaseService.getProject(projectID) }//AppService.getProject(projectID);
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    async list(@Query() params: any): Promise<object> {
        return { data: await this.databaseService.getProjects(params) }
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(projectSchema))
    async create(@Body() payload: any): Promise<object> {
        const { name, description, location } = payload
        let newProduct = await this.databaseService.createProject(name, description, location)

        return { msg: "created", data: newProduct };
    }
    @Put(":projectID")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Param("projectID", ParseIntPipe) projectID: number, @Body(new JoiValidationPipe(projectSchema)) payload: any): Promise<object> {
        return { msg: "updated", data: await this.databaseService.updateProject(projectID, payload) }
    }
    @Delete(":projectID")
    async delete(@Param("projectID", ParseIntPipe) projectID: number): Promise<object> {
        let deleted = await this.databaseService.deleteProject(projectID)
        return { msg: "deleted" }
    }
}