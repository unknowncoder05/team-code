import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // 👈 import

import { Project } from './../../entities/project.entity';
@Injectable()
export class DatabaseService {
    constructor(
        //@Inject('PG') private clientPg: Client,
        @InjectRepository(Project) private projectRepo: Repository<Project>,
    ) {
        //this.clientPg.query("SELECT * FROM projects")
    }
    db = {
        projects: {
            "0": {
                name: "project1",
                year: 2020
            },
            "1": {
                name: "project2",
                year: 2020
            },
            "2": {
                name: "project3",
                year: 2021
            },
        },
        languages: {
            "0": "python",
            "1": "javascript",
            "2": "rust"
        }
    }
    async createProject(name: string, description: string, location: string) {
        let poject = this.projectRepo.create({ name, description, location })
        await this.projectRepo.save(poject)
        return { id: poject.id };
    }
    getProject(id): object {
        return {
            data: this.projectRepo.findOne(id)
        };
    }
    getProjects(params): object {
        //this.clientPg.query("SELECT * FROM projects")
        return {
            data: this.projectRepo.find()
        };
    }
    updateProject(id, payload): object {
        return { data: this.db.projects[id] };
    }
    deleteProject(id): object {
        return { data: this.db.projects[id] };
    }
}
