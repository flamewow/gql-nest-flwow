import { PaginatedRecipe, RecipeEntity } from '@core/db/entities/recipe.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewRecipeInput } from './dto/new-recipe.input';
import { FindConditions, FindManyOptions, Repository } from 'typeorm';
import { paginate } from '@core/db/misc/paginate';
import { PaginationCursorArgs } from '@core/db/misc/pagination-args';

@Injectable()
export class RecipesService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async create(data: NewRecipeInput): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.create(data);
    const insertionResults = await this.recipeRepository.insert(recipe);
    if (insertionResults) {
      this.logger.log(insertionResults);
    }
    return recipe;
  }

  async paginated(pagination: PaginationCursorArgs, findConditions: FindConditions<RecipeEntity> = {}): Promise<PaginatedRecipe> {
    const query = this.recipeRepository.createQueryBuilder().select().where(findConditions);
    const output = await paginate(query, pagination);
    return output;
  }

  async findAll(findOptions?: FindManyOptions<RecipeEntity>): Promise<RecipeEntity[]> {
    return await this.recipeRepository.find(findOptions);
  }

  async findOneById(uuid: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { uuid } });
    return recipe;
  }

  async remove(uuid: string): Promise<boolean> {
    const { affected } = await this.recipeRepository.delete(uuid);
    return !!affected;
  }
}
