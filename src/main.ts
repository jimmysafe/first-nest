import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000, () =>
    console.log('Ready on http://localhost:5000/graphql'),
  );
}
bootstrap();
