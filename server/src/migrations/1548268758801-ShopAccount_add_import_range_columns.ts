import {MigrationInterface, QueryRunner} from "typeorm";

export class ShopAccountAddImportRangeColumns1548268758801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shop_accounts" ADD "imported_range_start" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" ADD "imported_range_end" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shop_accounts" DROP COLUMN "imported_range_end"`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" DROP COLUMN "imported_range_start"`);
    }

}
