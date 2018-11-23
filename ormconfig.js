module.exports = {
    type: 'mysql',
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    // synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    entities: ['src/entity/!(*.spec.ts)'],
    // migrations: ['src/migration/**/*.ts'],
    // subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
