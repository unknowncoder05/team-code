import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('languages')
export class LanguagesController {
    @Get("language/:languageID")
    getLanguage(@Param() params: any): object {
        return { data: "maintenance" };
    }
}
