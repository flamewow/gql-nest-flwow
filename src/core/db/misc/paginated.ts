import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginationInfo } from './page-info';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  paginationInfo: PaginationInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;
    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => PaginationInfo, { nullable: true })
    paginationInfo: PaginationInfo;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
