
import {Prisma} from '@prisma/client'




export class CreateBookDto {
  name: string;
author: string;
desc?: string;
firstEdition: Date;
stock: number;
price: Prisma.Decimal;
}
