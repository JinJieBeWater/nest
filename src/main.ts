import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // log query events
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.$on('query', (event: any) => {
    console.log(event);
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
