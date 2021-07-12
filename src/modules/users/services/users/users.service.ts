import { Injectable, Inject, NotFoundException } from '@nestjs/common';
//import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
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
    async get(id: number) {
        const user = await this.userRepo.findOne(
            {
                where: { id },
                select: ["username", "email", "role", "creationDate"]
            }
        );
        if (!user) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return user
    }
    async getByEmail(email: string) {
        const user = await this.userRepo.findOne(
            {
                where: { email },
                select: ["id","username", "email", "role", "password", "creationDate"]
            }
        );
        if (!user) {
            throw new NotFoundException(`${this.singular} with email ${email} not found`);
        }
        return user
    }
    /**/
    async list(params): Promise<object> {
        const users = await this.userRepo.find({
            select: ["username", "email", "role", "creationDate"]
        });
        if (!users) {
            throw new NotFoundException(`no ${this.plural} found`);
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
    }
}
