import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigin = configService.get<string>('CORS_ORIGIN') || '*';
  app.enableCors({
    origin: corsOrigin,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties of request
      forbidNonWhitelisted: true, // error for unknown properties present
    }),
  );

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
