
import {Prisma} from '@prisma/client'




export class UpdateBookDto {
  name?: string;
author?: string;
desc?: string;
firstEdition?: Date;
stock?: number;
price?: Prisma.Decimal;
}
