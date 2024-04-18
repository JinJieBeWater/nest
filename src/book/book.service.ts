import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';
import { ExtendedPrismaClient } from 'src/prisma.extension';

@Injectable()
export class BookService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async Book(
    BookWhereUniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<Book | null> {
    return this.prismaService.client.book.findUnique({
      where: BookWhereUniqueInput,
    });
  }

  async Books(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.client.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prismaService.client.book.create({
      data,
    });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { where, data } = params;
    return this.prismaService.client.book.update({
      data,
      where,
    });
  }

  async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.prismaService.client.book.delete({
      where,
    });
  }

  async countBook(where?: Prisma.BookWhereInput): Promise<number> {
    return this.prismaService.client.book.count({ where });
  }
}
