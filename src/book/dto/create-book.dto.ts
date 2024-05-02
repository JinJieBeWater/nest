import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsDefined,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: '书籍名称', example: '世界简史' })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({ description: '作者', example: '陈都安' })
  @IsDefined()
  @IsString()
  author: string;

  @ApiProperty({ description: '书籍描述', example: '这是一本好书' })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({ description: '书籍价格', example: 100 })
  @IsDefined()
  price: number;

  @ApiProperty({ description: '库存', example: 100 })
  @IsDefined()
  @IsInt()
  stock: number;

  @ApiProperty({ description: '出版日期', example: '2024-04-19T08:14:33.277Z' })
  @IsDefined()
  @IsISO8601()
  firstEdition: Date;
}
