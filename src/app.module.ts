import { config } from '@core/config';
import { ComplexityPlugin } from '@core/plugins/complexity.plugin';
import { LoggingPlugin } from '@core/plugins/logging.plugin';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.databaseConfig),
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule {}
