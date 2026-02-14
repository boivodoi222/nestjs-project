import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // chỉ nhận các property trong DTO
    forbidNonWhitelisted: false, // lỗi nếu có property lạ
    transform: true, // tự động convert payload sang class
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
