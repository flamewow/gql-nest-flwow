import { CuisineEntity, PaginatedCuisine } from '@core/db/entities/cuisine.entity';
import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { PaginationCursorArgs } from '@core/db/misc/pagination-args';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CuisinesService } from './cuisines.service';
import { RecipesLoader } from './recipes.loader';
import { RecipesService } from './recipes.service';

@Resolver(() => CuisineEntity)
export class CuisinesResolver {
  public logger = new Logger(this.constructor.name);

  constructor(private readonly cuisinesService: CuisinesService, private readonly recipiesService: RecipesService, private recipesLoader: RecipesLoader) {}

  @Query(() => PaginatedCuisine)
  async cuisines(@Args() pagination: PaginationCursorArgs): Promise<PaginatedCuisine> {
    return this.cuisinesService.paginated(pagination);
  }

  @Mutation(() => CuisineEntity)
  async addCuisine(@Args('name') name: string): Promise<CuisineEntity> {
    const cuisine = await this.cuisinesService.create(name);
    return cuisine;
  }

  @ResolveField(() => [RecipeEntity])
  async recipies(@Args() pagination: PaginationCursorArgs, @Parent() cuisine: CuisineEntity): Promise<RecipeEntity[]> {
    const { uuid } = cuisine;
    const recipes = await this.recipesLoader.batchCuisineRecipes.load(uuid);
    return recipes;
  }
}
