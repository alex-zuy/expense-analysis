import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductAndPurchaseCreate1548262545533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
          CREATE TABLE "products" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "user_id" integer,
            CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fb0102912ff8d6f02ca5b23993"
          ON "products"  ("name", "user_id") `);

        await queryRunner.query(`
          CREATE TABLE "purchases" (
            "id" SERIAL NOT NULL,
            "amount" real NOT NULL,
            "pricePerUnit" real NOT NULL,
            "purchased_at" TIMESTAMP NOT NULL,
            "product_id" integer,
            CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"
          FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "purchases" ADD CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9"
          FOREIGN KEY ("product_id") REFERENCES "products"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "purchases" DROP CONSTRAINT "FK_1ce91bd87ddfcecde930deeaab9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`DROP TABLE "purchases"`);
        await queryRunner.query(`DROP INDEX "IDX_fb0102912ff8d6f02ca5b23993"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }
}
