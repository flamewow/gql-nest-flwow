import { Logger } from 'nestjs-pino';
import { INestApplication } from '@nestjs/common';

export async function setupApp(app: INestApplication): Promise<INestApplication> {
  app.useLogger(app.get(Logger));

  // do the app setup here (setupApp func is separated from bootstrap func to be used in e2e tests)
  return app;
}
