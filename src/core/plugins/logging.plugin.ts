import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestContext, BaseContext, GraphQLRequestListener } from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  private logger = new Logger(LoggingPlugin.name);

  async requestDidStart(ctx: GraphQLRequestContext<BaseContext>): Promise<GraphQLRequestListener> {
    const startTime = new Date();
    const logger = this.logger;
    return {
      async willSendResponse() {
        const respTime = new Date().getTime() - startTime.getTime();
        const { errors } = ctx;
        const opType = ctx?.operation?.operation || 'unknown operation';
        const name = ctx?.operation?.name;

        if (errors) {
          const errorText = errors.reduce((a, i) => a + i.stack + '\n', '');
          logger.warn(`${opType}: ${respTime}ms \n ${errorText}`);
        } else {
          logger.log(`${opType} ${name?.value}: ${respTime}ms`);
        }
      },
    };
  }
}
