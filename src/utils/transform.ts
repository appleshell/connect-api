import { TransformFnParams } from 'class-transformer';

export const numberTransformer = (params: TransformFnParams) => {
  const { value } = params;
  return Number(value);
};
