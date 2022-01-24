import { Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationParamsDto {
  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  take?: number = null;

  @Field(() => Int)
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  skip?: number = 0;
}

export class PaginatedDto<TData> extends PaginationParamsDto {
  count: number;

  results: TData[];
}
