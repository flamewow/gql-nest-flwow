import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}, playground on: ${await app.getUrl()}/graphql`);
}
bootstrap();
