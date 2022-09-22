module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  multipleStatements: true,
  migrationsTableName: '__migrations',
  entities: [
    process.env.TYPEORM_ENTITIES
  ],
  migrations: [
    process.env.TYPEORM_MIGRATION
  ],
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR
  }
}
