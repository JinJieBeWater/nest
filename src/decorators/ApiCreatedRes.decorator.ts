import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ResultVo } from 'src/class/vo/result.vo';

export const ApiCreatedRes = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResultVo, model),
    ApiCreatedResponse({
      description: '后端传来喜报，创建成功啦~',
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
