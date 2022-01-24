import { Logger } from '@nestjs/common';
import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';
import { config } from '@core/config';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  private logger = new Logger(ComplexityPlugin.name);

  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    const { schema } = this.gqlSchemaHost;
    const logger = this.logger;
    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });
        if (complexity >= config.maxAllowedComplexity) {
          throw new GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: 20`);
        }
        logger.debug(`Query Complexity: ${complexity}`);
      },
    };
  }
}
