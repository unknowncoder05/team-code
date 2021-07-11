import { Module } from '@nestjs/common';
import { LanguagesController } from './controllers/languages.controller'
import { LanguageService } from './services/language/language.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './../../entities/language.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Language])
    ],
    providers: [LanguageService],
    controllers: [LanguagesController],
    exports: [LanguageService]
})
export class LanguagesModule {}
