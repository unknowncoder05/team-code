import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project } from './../../entities/project.entity';
@Injectable()
export class DatabaseService {
    constructor(
        //@Inject('PG') private clientPg: Client,
        @InjectRepository(Project) private projectRepo: Repository<Project>,
    ) {
        //this.clientPg.query("SELECT * FROM projects")
    }
    async createProject(name: string, description: string, location: string): Promise<object> {
        let poject = this.projectRepo.create({ name, description, location })
        await this.projectRepo.save(poject)
        return { id: poject.id };
    }
    async getProject(id: number): Promise<object> {
        const project = await this.projectRepo.findOne(id);
        if (!project) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return project;
    }
    async getProjects(params): Promise<object> {
        let data = await this.projectRepo.find()
        return data;
    }
    async updateProject(id: number, payload: object): Promise<object> {
        const project = await this.projectRepo.findOne(id);
        this.projectRepo.merge(project, payload);
        return await this.projectRepo.save(project);
    }
    async deleteProject(id: number): Promise<boolean> {
        let deleted = await this.projectRepo.delete(id)
        if (deleted.affected != 1) {
            return false
        }
        return true
    }
}
