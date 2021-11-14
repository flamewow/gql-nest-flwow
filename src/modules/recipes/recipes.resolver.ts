import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(() => RecipeEntity)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => RecipeEntity)
  @UseGuards(AuthGuard)
  async recipe(@Args('uuid') uuid: string): Promise<RecipeEntity> {
    const recipe = await this.recipesService.findOneById(uuid);
    if (!recipe) {
      throw new NotFoundException(uuid);
    }
    return recipe;
  }

  // @Query(() => [RecipeEntity])
  // recipes(@Args() paginationParams: PaginationParamsDto): Promise<PaginatedDto<RecipeEntity>> {
  //   return this.recipesService.findAll(paginationParams);
  // }

  @Mutation(() => RecipeEntity)
  async addRecipe(@Args('newRecipeData') newRecipeData: NewRecipeInput): Promise<RecipeEntity> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(() => RecipeEntity)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }
}
