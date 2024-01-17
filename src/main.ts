import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist : true,
    transform: true
  }
  ));
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  app.setGlobalPrefix('api/v1')
  
  const Port = process.env.LISTENING_PORT
  await app.listen(Port, ()=> console.log(`listening on port:${Port}`));
}
bootstrap();
