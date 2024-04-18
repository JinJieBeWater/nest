import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResultVo } from 'src/class/vo/result.vo';

export const ApiOkRes = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResultVo, model),
    ApiOkResponse({
      description: '后端传来喜报，接口调用成功啦~',
      schema: {
        title: `CreatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(ResultVo) },
          {
            properties: {
              records: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
