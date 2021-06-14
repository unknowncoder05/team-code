import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './controllers/projects/projects.controller';
import { LanguagesController } from './controllers/languages/languages.controller';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectService } from './services/project/project.service';
import { LanguageService } from './services/language/language.service';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.stage.env',
      load: [config],
      isGlobal: true,

    }),
    DatabaseModule,
  ],
  controllers: [AppController, ProjectsController, LanguagesController],
  providers: [AppService, ProjectService, LanguageService],
})
export class AppModule { }
