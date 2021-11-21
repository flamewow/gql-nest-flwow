import { CuisineEntity, PaginatedCuisine } from '@core/db/entities/cuisine.entity';
import { PaginationArgs } from '@core/db/misc/pagination-args';
import { Logger } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CuisinesService } from './cuisines.service';
import { RecipesService } from './recipes.service';

@Resolver(() => CuisineEntity)
export class CuisinesResolver {
  public logger = new Logger(this.constructor.name);

  constructor(private readonly cuisinesService: CuisinesService, private readonly recipiesService: RecipesService) {}

  @Query(() => PaginatedCuisine)
  async cuisines(@Args() pagination: PaginationArgs): Promise<PaginatedCuisine> {
    return this.cuisinesService.paginated(pagination);
  }

  @Mutation(() => CuisineEntity)
  async addCuisine(@Args('name') name: string): Promise<CuisineEntity> {
    const cuisine = await this.cuisinesService.create(name);
    return cuisine;
  }

  @ResolveField()
  async recipies(@Args() pagination: PaginationArgs, @Parent() cuisine: CuisineEntity) {
    const { uuid } = cuisine;
    this.logger.log(`pagination args: ${JSON.stringify(pagination)}`);
    return this.recipiesService.findAll({ where: { cuisineUUID: uuid } });
  }
}
