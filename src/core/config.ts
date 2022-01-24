import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenvConfig();

class Config {
  readonly host: string = process.env.HOST;
  readonly port: number = parseInt(process.env.PORT, 10);

  readonly redisHost: string = process.env.REDIS_HOST;
  readonly redisPort: number = parseInt(process.env.REDIS_PORT, 10);

  readonly jwtAccessSecret: string = process.env.JWT_ACCESS_SECRET;
  readonly jwtAccessExpiresIn: string = process.env.JWT_ACCESS_EXPIRES_IN;

  readonly jwtRefreshSecret: string = process.env.JWT_REFRESH_SECRET;
  readonly jwtRefreshExpiresIn: string = process.env.JWT_REFRESH_EXPIRES_IN;

  readonly passwordHash: { N: number } = { N: 1024 };
  readonly maxAllowedComplexity: number = 20;

  readonly databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    autoLoadEntities: true,
    entities: ['./dist/**/*.entity.js'],
    migrations: ['./dist/src/db/migrations/*.js'],
    cli: {
      entitiesDir: './src/db/entities',
      migrationsDir: './src/db/migrations',
    },
    synchronize: true, // TODO: remove it once db schema is stabilized
    logging: false, // set to true for SQL queries debugging
  };
}

// toDo: move to ConfigModule later
export const config = new Config();
