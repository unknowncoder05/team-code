import {MigrationInterface, QueryRunner} from "typeorm";

export class someDates1623611219385 implements MigrationInterface {
    name = 'someDates1623611219385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "creationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ADD "upadatenDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "upadatenDate"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "creationDate"`);
    }

}
