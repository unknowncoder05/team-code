import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './controllers/projects/projects.controller';
import { LanguagesController } from './controllers/languages/languages.controller';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectService } from './services/project/project.service';
import { LanguageService } from './services/language/language.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './services/user/user.service';
import { UsersController } from './controllers/users/users.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.stage.env',
      load: [config],
      isGlobal: true,

    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController, ProjectsController, LanguagesController, UsersController],
  providers: [AppService, ProjectService, LanguageService, UserService, AuthService],
})
export class AppModule { }
