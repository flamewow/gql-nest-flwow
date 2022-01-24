import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paginated } from '../misc/paginated';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';
import { CuisineEntity } from './cuisine.entity';

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

  @Column('uuid', { nullable: false })
  cuisineUUID: string;
  @ManyToOne(() => CuisineEntity, (cuisine) => cuisine.recipes)
  @JoinColumn({ name: 'cuisineUUID' })
  @Field(() => CuisineEntity)
  cuisine: CuisineEntity;
}

@ObjectType()
export class PaginatedRecipe extends Paginated(RecipeEntity) {}
