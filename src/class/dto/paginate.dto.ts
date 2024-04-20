import { Prisma } from '@prisma/client';

export class paginateDto {
  where?: Prisma.BookWhereInput;
  orderBy?: Prisma.Enumerable<Prisma.BookOrderByWithRelationInput>;
  page?: number;
  limit?: number;
}
