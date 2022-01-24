import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';
import { Paginated } from '../misc/paginated';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';
import { RecipeEntity } from './recipe.entity';

@Entity('cuisine')
@ObjectType({ description: 'cuisine' })
export class CuisineEntity extends AbstractBaseEntity {
  @Column()
  @Field()
  name: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.cuisine)
  @Field(() => [RecipeEntity], { nullable: true })
  recipes: RecipeEntity[];
}

@ObjectType()
export class PaginatedCuisine extends Paginated(CuisineEntity) {}
