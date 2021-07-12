import { Injectable, Inject, NotFoundException } from '@nestjs/common';
//import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from '../../../../entities/project.entity';

@Injectable()
export class ProjectService {
    plural = "projects";
    singular = "project";
    constructor(
        //@Inject('PG') private clientPg: Client,
        @InjectRepository(Project) private projectRepo: Repository<Project>,
    ) {
        //this.clientPg.query("SELECT * FROM projects")
    }
    async createProject(owner: string, name: string, description: string, location: string): Promise<object> {
        let poject = this.projectRepo.create({ name, description, location })
        await this.projectRepo.save(poject)
        return { id: poject.id };
    }
    async getProject(id: number): Promise<object> {
        const project = await this.projectRepo.findOne(id);
        if (!project) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return project;
    }
    async getProjects(params): Promise<object> {
        const projects = await this.projectRepo.find();
        if (!projects) {
            throw new NotFoundException(`no ${this.plural} found`);
        }
        return projects;
    }
    async updateProject(id: number, payload: object): Promise<object> {
        const project = await this.projectRepo.findOne(id);
        if (!project) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        this.projectRepo.merge(project, payload);
        return await this.projectRepo.save(project);
    }
    async deleteProject(id: number): Promise<boolean> {
        let deleted = await this.projectRepo.delete(id)
        if (deleted.affected != 1) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return true
    }
}
