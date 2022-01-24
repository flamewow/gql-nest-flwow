import { config } from '@core/config';
import { ComplexityPlugin } from '@core/plugins/complexity.plugin';
import { LoggingPlugin } from '@core/plugins/logging.plugin';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './modules/recipes/recipes.module';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    AuthModule,
    RecipesModule,
    TypeOrmModule.forRoot(config.databaseConfig),
    GraphQLModule.forRoot({
      // TODO: move to config
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    LoggerModule.forRoot({
      // TODO: move to config
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  ignore: 'pid,hostname',
                  singleLine: true,
                  levelFirst: true,
                  timestampKey: 'time',
                  translateTime: true,
                },
              }
            : {},
        autoLogging: false,
        genReqId: () => uuid(),
        useLevel: 'debug',
        serializers: {
          req: () => undefined, //(req: any) => ({ id: req.id, method: req.method }),
          res: () => undefined, //(res: any) => ({ id: res.statusCode }),
        },
        customProps: (req: any) => ({ id: req.id, ts: new Date() }),
      },
    }),
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule {}
