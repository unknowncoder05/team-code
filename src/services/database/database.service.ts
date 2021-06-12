import { Injectable } from '@nestjs/common';
import { Client } from "pg";


const client = new Client({
    user: 'root',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
});

@Injectable()
export class DatabaseService {
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
    createProject(params): object {
        return { data: params };
    }
    getProject(id): object {
        return { data: this.db.projects[id] };
    }
    getProjects(params): object {
        return { data: params };
    }
    updateProject(id, payload): object {
        return { data: this.db.projects[id] };
    }
    deleteProject(id): object {
        return { data: this.db.projects[id] };
    }
}
