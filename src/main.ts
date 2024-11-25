import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: 'http://localhost:3001', // Permitir requisições do front-end na porta 3001
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
    credentials: true,               // Permitir envio de cookies (se necessário)
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
