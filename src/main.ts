import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
  .setTitle('management system API')
  .setDescription('management system')
  .setVersion('1.0.0')
  .addTag('users')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Token',
    }, 'access-token',
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const Port = process.env.LISTENING_PORT
  await app.listen(Port, ()=> console.log(`listening on port:${Port}`));
}
bootstrap();
