"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true,
        transform: true
    }));
    app.enableCors({
        origin: 'http://localhost:3000'
    });
    app.setGlobalPrefix('api/v1');
    const config = new swagger_1.DocumentBuilder()
        .setTitle(' Pets-Store API')
        .setDescription('pets store')
        .setVersion('1.0.0')
        .addTag('users')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const Port = process.env.LISTENING_PORT;
    await app.listen(Port, () => console.log(`listening on port:${Port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map