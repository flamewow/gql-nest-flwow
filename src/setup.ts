import { config } from '@core/config';
import { NestExpressApplication } from '@nestjs/platform-express';

export function setupApp(app: NestExpressApplication): NestExpressApplication {
  app.useLogger(config.logLevels);

  app.useStaticAssets(`${process.cwd()}/static`);
  app.useStaticAssets(`${process.cwd()}/src/core/swagger/frontend`);

  return app;
}
