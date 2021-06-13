import { Controller, Res, Get, Post, Param, Query, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { Response } from "express"
import { DatabaseService } from './../../services/database/database.service';
@Controller('project')
export class ProjectsController {
    constructor(private databaseService: DatabaseService) { }
    @Get(":projectID")
    @HttpCode(HttpStatus.FOUND)
    async get(@Param("projectID") projectID: number): Promise<object> {
        return { data: await this.databaseService.getProject(projectID) }//AppService.getProject(projectID);
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    async list(@Query() params: any): Promise<object> {
        return { data: await this.databaseService.getProjects(params) }
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: any): Promise<object> {
        const { name, description, location } = payload
        let newProduct = await this.databaseService.createProject(name, description, location)

        return { msg: "created", data: newProduct };
    }
    @Put(":projectID")
    @HttpCode(HttpStatus.ACCEPTED)
    async update(@Param("projectID") projectID: number, @Body() payload: any): Promise<object> {
        return { msg: "updated", data: await this.databaseService.updateProject(projectID, payload) }
    }
    @Delete(":projectID")
    async delete(@Res() response: Response, @Param("projectID") projectID: number) {
        let deleted = await this.databaseService.deleteProject(projectID)
        let status = HttpStatus.OK,
            res = { msg: "deleted" }
        if (!deleted) {
            res.msg = "not found"
            status = HttpStatus.NOT_FOUND
        }
        response.status(status).send(res)
    }
}