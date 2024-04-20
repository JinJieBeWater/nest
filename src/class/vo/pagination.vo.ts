import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class PaginationVo<TData> {
  @ApiProperty({
    description: '数据',
  })
  records: TData[];
  @ApiProperty({
    description: '每页条数',
    example: 10,
  })
  limit: number;
  @ApiProperty({
    description: '当前页码',
    example: 1,
  })
  page: number;
  @ApiProperty({
    description: '总条数数',
    example: 100,
  })
  count: number;
  @ApiProperty({
    description: '是否超过总条数数',
  })
  exceedCount: boolean;

  @ApiProperty({
    description: '是否超过总页数',
  })
  exceedTotalPages: boolean;
}
