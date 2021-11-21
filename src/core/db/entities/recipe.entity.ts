import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { Paginated } from '../misc/paginated';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';

@Entity('recipe')
@ObjectType({ description: 'recipe' })
export class RecipeEntity extends AbstractBaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column('text', { array: true })
  @Field(() => [String])
  ingredients: string[];
}

@ObjectType()
export class PaginatedRecipe extends Paginated(RecipeEntity) {}
