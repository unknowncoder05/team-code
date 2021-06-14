import {MigrationInterface, QueryRunner} from "typeorm";

export class language1623674721064 implements MigrationInterface {
    name = 'language1623674721064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "creationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "upadatenDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7df7d1e250ea2a416f078a631fb" UNIQUE ("name"), CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "creationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "upadatenDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "language"`);
    }

}
