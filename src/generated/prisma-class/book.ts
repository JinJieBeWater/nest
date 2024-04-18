import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  author: string;

  @ApiPropertyOptional({ type: String })
  desc?: string;

  @ApiProperty({ type: Date })
  firstEdition: Date;

  @ApiProperty({ type: Number })
  stock: number;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
