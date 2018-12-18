module.exports = {
    type: 'postgres',
    url: process.env.TYPEORM_URL,
    migrationsTableName: 'typeorm_migrations',
    migrations: [
        'src/migrations/*.ts'
    ],
    entities: [
        './src/entities/*.ts'
    ],
    cli: {
        migrationsDir: 'src/migrations/'
    }
};
