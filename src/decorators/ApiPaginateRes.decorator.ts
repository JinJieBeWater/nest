import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationVo } from 'src/class/vo/pagination.vo';
import { ResultVo } from 'src/class/vo/result.vo';

export const ApiPaginatedRes = <TModel extends Type<any>>(model: TModel) => {
  const wrappedSchemaTitle = `ResultVoOfPaginationVoOf${model.name}`;

  return applyDecorators(
    ApiExtraModels(PaginationVo, model),
    ApiOkResponse({
      description: '后端传来喜报，接口调用成功啦~',
      schema: {
        title: wrappedSchemaTitle,
        allOf: [
          { $ref: getSchemaPath(ResultVo) }, // 引用 ResultVo
          {
            properties: {
              data: {
                // 定义 PaginationVo<model> 结构
                $ref: getSchemaPath(PaginationVo),
                additionalProperties: false,
                properties: {
                  records: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
