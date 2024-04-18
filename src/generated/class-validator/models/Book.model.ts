import { Prisma } from "@prisma/client";
import { IsInt, IsDefined, IsString, IsOptional, IsDate } from "class-validator";
import "./";

export class Book {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    author!: string;

    @IsOptional()
    @IsString()
    desc?: string;

    @IsDefined()
    @IsDate()
    firstEdition!: Date;

    @IsDefined()
    @IsInt()
    stock!: number;

    @IsDefined()
    price!: Prisma.Decimal;

    @IsDefined()
    @IsDate()
    createdAt!: Date;
}
