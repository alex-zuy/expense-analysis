import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAddFullNameAndFixID1547988239265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "full_name" DROP DEFAULT`);
        await queryRunner.query(`CREATE SEQUENCE "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

}
