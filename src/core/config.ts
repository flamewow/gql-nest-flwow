import { LogLevel } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenvConfig();

class Config {
  readonly host: string = process.env.HOST;
  readonly port: number = parseInt(process.env.PORT, 10);
  readonly clientUrl: string = process.env.CLIENT_URL;
  readonly nodeEnv: string = process.env.NODE_ENV;
  readonly staticUrl: string = process.env.STATIC_URL;

  readonly redisHost: string = process.env.REDIS_HOST;
  readonly redisPort: number = parseInt(process.env.REDIS_PORT, 10);

  readonly jwtAccessSecret: string = process.env.JWT_ACCESS_SECRET;
  readonly jwtAccessExpiresIn: string = process.env.JWT_ACCESS_EXPIRES_IN;

  readonly jwtRefreshSecret: string = process.env.JWT_REFRESH_SECRET;
  readonly jwtRefreshExpiresIn: string = process.env.JWT_REFRESH_EXPIRES_IN;

  readonly maxDateTitleLength = 50;
  readonly maxBodySize: string = '50mb';
  readonly maxUrlEncodedSize: string = '5mb';
  readonly passwordHash: { N: number } = { N: 1024 };
  readonly throttlerDefTTL: number = 60;
  readonly throttlerDefLimit: number = 10;
  readonly redisCacheDB: number = 1;
  readonly cacheGlobalTTL: number = 60;
  readonly redisIODB: number = 2;

  readonly logLevels: LogLevel[] = <LogLevel[]>process.env.LOG_LEVELS.split(',');

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
    synchronize: true, // Do not use in production
  };
}

export const config = new Config();
