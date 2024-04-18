import { Decimal } from '@prisma/client/runtime/library';

export class Book {
  id: number;
  name: string;
  author: string;
  desc: string | null;
  firstEdition: Date;
  stock: number;
  price: number | Decimal;
  createdAt: Date;
}
