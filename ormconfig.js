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
    entities: ['dist/entity/!(*.spec.js)'],
    // migrations: ['dist/migration/**/*.js'],
    // subscribers: ['dist/subscriber/**/*.js'],
    cli: {
        entitiesDir: 'dist/entity',
        migrationsDir: 'dist/migration',
        subscribersDir: 'dist/subscriber',
    },
};
