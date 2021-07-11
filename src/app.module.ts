import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
//import { LanguagesModule } from './modules/languages/languages.module';
import { ProjectsModule } from './modules/projects/projects.module';


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
    UsersModule,
    //LanguagesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
