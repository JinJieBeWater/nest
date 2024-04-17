import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from './prisma.extension';

@Injectable()
export class AppService {
  constructor(
    // ✅ use `ExtendedPrismaClient` from extension for correct type-safety
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async usersPage() {
    // 🦾 use new `paginate` function
    const [books, meta] = await this.prismaService.client.book
      .paginate()
      .withPages({
        limit: 10,
        page: 1,
        includePageCount: true,
      });

    return {
      books,
      meta,
    };
  }
}
