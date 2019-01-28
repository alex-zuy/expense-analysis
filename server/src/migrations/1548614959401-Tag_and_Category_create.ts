import {MigrationInterface, QueryRunner} from "typeorm";

export class TagAndCategoryCreate1548614959401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
          CREATE TABLE "tags" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "color" character varying NOT NULL,
            "user_id" integer NOT NULL,
            CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1d8718578ce96a09d1aa2237a1" ON "tags"  ("user_id", "name") `);
        await queryRunner.query(`
          CREATE TABLE "categories" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "color" character varying NOT NULL,
            "parent_id" integer,
            "user_id" integer NOT NULL,
            CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
          )`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_48f0690983e955b500b4a3e029" ON "categories"  ("user_id", "name") `);
        await queryRunner.query(`
          CREATE TABLE "product_tags" (
            "product_id" integer NOT NULL,
            "tag_id" integer NOT NULL,
            CONSTRAINT "PK_8ca809b37ff76596b63fe60ac41" PRIMARY KEY ("product_id", "tag_id")
          )`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_88cea2dc9c31951d06437879b40" FOREIGN KEY ("parent_id") REFERENCES "categories"("id")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_2296b7fe012d95646fa41921c8b" FOREIGN KEY ("user_id") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "product_tags" ADD CONSTRAINT "FK_5b0c6fc53c574299ecc7f9ee22e" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_tags" ADD CONSTRAINT "FK_f2cd3faf2e129a4c69c05a291e8" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_tags" DROP CONSTRAINT "FK_f2cd3faf2e129a4c69c05a291e8"`);
        await queryRunner.query(`ALTER TABLE "product_tags" DROP CONSTRAINT "FK_5b0c6fc53c574299ecc7f9ee22e"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_2296b7fe012d95646fa41921c8b"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_88cea2dc9c31951d06437879b40"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "product_tags"`);
        await queryRunner.query(`DROP INDEX "IDX_48f0690983e955b500b4a3e029"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "IDX_1d8718578ce96a09d1aa2237a1"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
