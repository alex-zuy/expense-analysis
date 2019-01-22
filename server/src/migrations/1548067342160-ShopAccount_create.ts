import {MigrationInterface, QueryRunner} from "typeorm";

export class ShopAccountCreate1548067342160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "shop_accounts" (
                "id" SERIAL NOT NULL,
                "login" character varying NOT NULL,
                "access_token" character varying NOT NULL,
                "expires_at" TIMESTAMP NOT NULL,
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "UQ_bcf7e6eb76a0e04db8a607f62ef" UNIQUE ("login"),
                CONSTRAINT "REL_2c3912781ca5aad5b208495ce2" UNIQUE ("user_id"),
                CONSTRAINT "PK_436ce65302f7168532d6ac619dd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "shop_accounts"
                ADD CONSTRAINT "FK_2c3912781ca5aad5b208495ce26" FOREIGN KEY ("user_id") REFERENCES "users"("id")
                  ON DELETE RESTRICT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "shop_accounts" DROP CONSTRAINT "FK_2c3912781ca5aad5b208495ce26"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "full_name" SET DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "shop_accounts"`);
    }

}
