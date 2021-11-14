import { config } from '@core/config';
import { ComplexityPlugin } from '@core/plugins/complexity.plugin';
import { LoggingPlugin } from '@core/plugins/logging.plugin';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.databaseConfig),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    RecipesModule,
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule {}
