import { Prisma } from '@prisma/client';

export class Book {
  id: number;
  name: string;
  author: string;
  desc: string | null;
  firstEdition: Date;
  stock: number;
  price: Prisma.Decimal;
  createdAt: Date;
}
