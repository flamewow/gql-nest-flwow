import { Logger } from 'nestjs-pino';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupApp(app: NestExpressApplication): NestExpressApplication {
  app.useLogger(app.get(Logger));

  app.useStaticAssets(`${process.cwd()}/static`);
  app.useStaticAssets(`${process.cwd()}/src/core/swagger/frontend`);

  return app;
}
