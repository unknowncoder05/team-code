import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller'
import { ProjectService } from './services/project/project.service'
import { UsersModule } from './../users/users.module';
import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './../../entities/project.entity';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([Project])
    ],
    providers: [ProjectService],
    controllers: [ProjectsController],
    exports: [ ProjectService ]
})
export class ProjectsModule {}
