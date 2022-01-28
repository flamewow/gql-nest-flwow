import { CuisineEntity } from '@core/db/entities/cuisine.entity';
import { PaginatedRecipe, RecipeEntity } from '@core/db/entities/recipe.entity';
import { PaginationCursorArgs } from '@core/db/misc/pagination-args';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CuisinesLoader } from './cuisines.loader';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesService } from './recipes.service';

@Resolver(() => RecipeEntity)
@UseGuards(JwtAuthGuard)
export class RecipesResolver {
  constructor(private recipesService: RecipesService, private cuisinesLoader: CuisinesLoader) {}

  @Query(() => RecipeEntity)
  async recipe(@Args('uuid') uuid: string): Promise<RecipeEntity> {
    const recipe = await this.recipesService.findOneById(uuid);
    if (!recipe) {
      throw new NotFoundException(uuid);
    }
    return recipe;
  }

  @Query(() => PaginatedRecipe)
  async recipes(@Args() pagination: PaginationCursorArgs): Promise<PaginatedRecipe> {
    return this.recipesService.paginated(pagination);
  }

  @Mutation(() => RecipeEntity)
  async addRecipe(@Args('newRecipeData') newRecipeData: NewRecipeInput): Promise<RecipeEntity> {
    const recipe = await this.recipesService.create(newRecipeData);
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @ResolveField(() => CuisineEntity)
  async cuisine(@Args() pagination: PaginationCursorArgs, @Parent() recipe: RecipeEntity): Promise<CuisineEntity> {
    const { cuisineUUID } = recipe;
    const cuisines = await this.cuisinesLoader.batchCuisines.load(cuisineUUID);
    return cuisines;
  }
}
