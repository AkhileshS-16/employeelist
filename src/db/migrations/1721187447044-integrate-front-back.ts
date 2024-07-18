import { MigrationInterface, QueryRunner } from "typeorm";

export class IntegrateFrontBack1721187447044 implements MigrationInterface {
    name = 'IntegrateFrontBack1721187447044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "name" TO "dname"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "ename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "ename"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" RENAME COLUMN "dname" TO "name"`);
    }

}
