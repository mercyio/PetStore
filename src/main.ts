import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist : true}
  ));
  const Port = process.env.LISTENING_PORT
  await app.listen(Port, ()=> console.log(`listening on port:${Port}`));
}
bootstrap();
