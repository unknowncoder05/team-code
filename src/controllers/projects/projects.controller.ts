import {
    Controller, Get, Post, Param, Query, Body, Put, Delete, HttpStatus, HttpCode
    , ParseIntPipe, UsePipes
} from '@nestjs/common';
//import { Response } from "express"
import { JoiValidationPipe } from '../../pipe/joi-validation.pipe'
import { ProjectService } from './../../services/project/project.service';
import { projectSchema } from './../../schemas/project.schema';


@Controller('project')
export class ProjectsController {
    constructor(private projectService: ProjectService) { }
    @Get(":projectID")
    @HttpCode(HttpStatus.FOUND)
    async get(@Param("projectID", ParseIntPipe) projectID: number): Promise<object> {
        return { data: await this.projectService.getProject(projectID) }//AppService.getProject(projectID);
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    async list(@Query() params: any): Promise<object> {
        return { data: await this.projectService.getProjects(params) }
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new JoiValidationPipe(projectSchema))
    async create(@Body() payload: any): Promise<object> {
        const { name, description, location } = payload
        let newProduct = await this.projectService.createProject(name, description, location)

        return { msg: "created", data: newProduct };
    }
    @Put(":projectID")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Param("projectID", ParseIntPipe) projectID: number, @Body(new JoiValidationPipe(projectSchema)) payload: any): Promise<object> {
        return { msg: "updated", data: await this.projectService.updateProject(projectID, payload) }
    }
    @Delete(":projectID")
    async delete(@Param("projectID", ParseIntPipe) projectID: number): Promise<object> {
        let deleted = await this.projectService.deleteProject(projectID)
        return { msg: "deleted" }
    }
}