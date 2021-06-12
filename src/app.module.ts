import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './controllers/projects/projects.controller';
import { LanguagesController } from './controllers/languages/languages.controller';
import { DatabaseService } from './services/database/database.service';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController, LanguagesController],
  providers: [AppService, DatabaseService],
})
export class AppModule { }
