"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const Port = process.env.LISTENING_PORT;
    await app.listen(Port, () => console.log(`listening on port:${Port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map