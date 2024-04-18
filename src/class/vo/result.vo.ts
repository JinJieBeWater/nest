import { ApiProperty } from '@nestjs/swagger';

export class ResultVo<TData> {
  @ApiProperty({
    description: '状态码',
    example: 200,
  })
  code: number;
  @ApiProperty({
    description: '状态描述',
    example: 'success',
  })
  msg: string;
  data: TData[];
}
