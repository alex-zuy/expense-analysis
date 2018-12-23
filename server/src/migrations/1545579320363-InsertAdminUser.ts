import {MigrationInterface, QueryRunner} from 'typeorm';
import {BcryptPasswordHashingHandler} from '../PasswordHashingHandler';

export class InsertAdminUser1545579320363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        const passwordHash = await new BcryptPasswordHashingHandler().calculatePasswordHash('password');

        queryRunner.query(
            'INSERT INTO users(id, email, password) VALUES($1, $2, $3)',
            [1, 'admin@example.com', passwordHash]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.query('TRUNCATE users');
    }
}
