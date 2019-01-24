import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMissingIndicesAndConstraints1548315709761 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shop_accounts" DROP CONSTRAINT "FK_2c3912781ca5aad5b208495ce26"`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`DROP INDEX "IDX_fb0102912ff8d6f02ca5b23993"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "product_id" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fb0102912ff8d6f02ca5b23993" ON "products"  ("name", "user_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_74092ee10709f7150bc1636a80" ON "purchases"  ("product_id", "purchased_at") `);
        await queryRunner.query(`ALTER TABLE "shop_accounts" ADD CONSTRAINT "FK_2c3912781ca5aad5b208495ce26" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9" FOREIGN KEY ("product_id") REFERENCES "products"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" DROP CONSTRAINT "FK_2c3912781ca5aad5b208495ce26"`);
        await queryRunner.query(`DROP INDEX "IDX_74092ee10709f7150bc1636a80"`);
        await queryRunner.query(`DROP INDEX "IDX_fb0102912ff8d6f02ca5b23993"`);
        await queryRunner.query(`ALTER TABLE "purchases" ALTER COLUMN "product_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fb0102912ff8d6f02ca5b23993" ON "products"  ("name", "user_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop_accounts" ADD CONSTRAINT "FK_2c3912781ca5aad5b208495ce26" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }
}
