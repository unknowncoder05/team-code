import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        })
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
