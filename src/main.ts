import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5500, () =>
    console.log('Ready on http://localhost:5500/graphql'),
  );
}
bootstrap();
