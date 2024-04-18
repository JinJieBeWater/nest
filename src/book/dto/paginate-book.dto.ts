import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsIn, Min, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class BookQueryDto {
  @ApiProperty({ description: '当前页码', example: 1 })
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  currentPage: number = 1;

  @ApiProperty({ description: '每页条数', example: 10 })
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  pageSize: number = 10;

  @ApiPropertyOptional({ description: '名称' })
  @IsOptional()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ description: '作者' })
  @IsOptional()
  @MaxLength(100)
  author?: string;

  @ApiPropertyOptional({
    description: '排序方式',
    example: 'desc',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortMethod?: 'asc' | 'desc';
}
