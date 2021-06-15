import { Injectable, Inject, NotFoundException } from '@nestjs/common';
//import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    plural = "users";
    singular = "user";
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {
    }
    async create(username: string, email: string, password: string) {
        let pswHash = await bcrypt.hash(password, 10)
        let element = this.userRepo.create({ username, email, password: pswHash })
        await this.userRepo.save(element)
    }
    /*async get(id: number): Promise<object> {
        const user = await this.userRepo.findOne(id);
        if (!user) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return {
            username: user.username,
            email: user.email,
            role: user.role,
            projects: user.projects,
            creationDate: user.creationDate,
        }
    }


    async list(params): Promise<object> {
        const users = await this.userRepo.find();
        if (!users) {
            throw new NotFoundException(`no ${this.plural} found`);
        }
        return {
            username: user.username,
            email: user.email,
            role: user.role,
            projects: user.projects,
            creationDate: user.creationDate,
        }
        return users;
    }
    async update(id: number, payload: object): Promise<object> {
        const element = await this.userRepo.findOne(id);
        if (!element) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        this.userRepo.merge(element, payload);
        return await this.userRepo.save(element);
    }
    async delete(id: number): Promise<boolean> {
        let deleted = await this.userRepo.delete(id)
        if (deleted.affected != 1) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return true
    }*/
}
