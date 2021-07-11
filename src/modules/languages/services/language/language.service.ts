import { Injectable, Inject, NotFoundException } from '@nestjs/common';
//import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Language } from '../../../../entities/language.entity';

@Injectable()
export class LanguageService {
    plural = "languages";
    singular = "language";
    constructor(
        @InjectRepository(Language) private languageRepo: Repository<Language>,
    ) {
    }
    async create(name: string): Promise<object> {
        let element = this.languageRepo.create({ name })
        await this.languageRepo.save(element)
        return { id: element.id };
    }
    async get(id: number): Promise<object> {
        const language = await this.languageRepo.findOne(id);
        if (!language) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return language;
    }
    async list(params): Promise<object> {
        const languages = await this.languageRepo.find();
        if (!languages) {
            throw new NotFoundException(`no ${this.plural} found`);
        }
        return languages;
    }
    async update(id: number, payload: object): Promise<object> {
        const element = await this.languageRepo.findOne(id);
        if (!element) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        this.languageRepo.merge(element, payload);
        return await this.languageRepo.save(element);
    }
    async delete(id: number): Promise<boolean> {
        let deleted = await this.languageRepo.delete(id)
        if (deleted.affected != 1) {
            throw new NotFoundException(`${this.singular} with id ${id} not found`);
        }
        return true
    }
}
