import { ApiProperty } from '@nestjs/swagger';

export class PaginationVo<TData> {
  @ApiProperty({
    description: '数据',
  })
  records: TData[];

  @ApiProperty({
    description: '当前页码',
    minimum: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: '每页条数',
    example: 10,
  })
  pageSize: number;

  @ApiProperty({
    description: '总条数',
    example: 100,
  })
  total: number;
}
