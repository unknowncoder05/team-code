import { Module } from '@nestjs/common';
import { Client } from "pg";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './../../entities/project.entity';
import { ConfigType } from '@nestjs/config';
import config from '../../config';
/*const client = new Client(dbConfig);

client.connect();*/
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { username, host, database, password, port } = configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username,
                    password,
                    database,
                    synchronize: false,
                    autoLoadEntities: true,
                }
            }
        }),
        TypeOrmModule.forFeature([Project])
    ],
    providers: [
        /*{
            provide: 'PG',
            useValue: client,
        },*/
    ],
    exports: [/*'PG',*/ 'TypeOrmModule'],
})
export class DatabaseModule { }
