import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { PrismaModel } from './generated/prisma-class';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * 全局管道
   */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /**
   * Swagger
   * 设置标题、描述、版本等属性
   */
  const config = new DocumentBuilder()
    .setTitle('网维后台快速手册')
    .setDescription('帮助快速达到参与实际项目后台的水准')
    .setVersion('1.0')
    .build();
  /**
   * 可选配置参数
   */
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    extraModels: [...PrismaModel.extraModels],
  };
  /**
   * 创建 OpenAPI 文档 的可序列化对象
   */
  const document = SwaggerModule.createDocument(app, config, options);
  /**
   * 启动Swagger文档
   */
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
