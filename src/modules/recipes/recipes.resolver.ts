import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { PaginatedDto, PaginationParamsDto } from '@dtos/common.dto';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver((of) => RecipeEntity)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => RecipeEntity)
  async recipe(@Args('uuid') uuid: string): Promise<RecipeEntity> {
    const recipe = await this.recipesService.findOneById(uuid);
    if (!recipe) {
      throw new NotFoundException(uuid);
    }
    return recipe;
  }

  // @Query((returns) => [RecipeEntity])
  // recipes(@Args() paginationParams: PaginationParamsDto): Promise<PaginatedDto<RecipeEntity>> {
  //   return this.recipesService.findAll(paginationParams);
  // }

  @Mutation((returns) => RecipeEntity)
  async addRecipe(@Args('newRecipeData') newRecipeData: NewRecipeInput): Promise<RecipeEntity> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation((returns) => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription((returns) => RecipeEntity)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
