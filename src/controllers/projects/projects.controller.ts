import { Controller, Res, Get, Post, Param, Query, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { Response } from "express"
import { DatabaseService } from './../../services/database/database.service';
@Controller('project')
export class ProjectsController {
    constructor(private databaseService: DatabaseService) { }
    @Get(":projectID")
    @HttpCode(HttpStatus.FOUND)
    get(@Param("projectID") projectID: string): object {
        return { data: "maintenance" }//AppService.getProject(projectID);
    }
    @Get()
    @HttpCode(HttpStatus.FOUND)
    list(@Query() params: any): object {
        return this.databaseService.getProjects(params);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() payload: any): object {
        return this.databaseService.createProject(payload);
    }
    @Put(":projectID")
    @HttpCode(HttpStatus.ACCEPTED)
    update(@Param("projectID") projectID: string, @Body() payload: any): object {
        return this.databaseService.updateProject(projectID, payload);
    }
    @Delete(":projectID")
    delete(@Res() response: Response, @Param("projectID") projectID: string) {
        let deleted = this.databaseService.deleteProject(projectID)
        let status = HttpStatus.OK,
            res = { msg: "deleted" }
        if (projectID != "1") {
            status = HttpStatus.NOT_FOUND
            res = { msg: "project not found" }
        }
        response.status(status).send(res)
    }
}