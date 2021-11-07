import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewRecipeInput } from './dto/new-recipe.input';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginatedDto } from '@dtos/common.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async create(data: NewRecipeInput): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.create(data);
    const insertionResults = await this.recipeRepository.insert(recipe);
    if (insertionResults) {
      console.log(insertionResults);
    }
    return recipe;
  }

  async findAll({ skip, take }: FindManyOptions<RecipeEntity>): Promise<PaginatedDto<RecipeEntity>> {
    const [rows, count] = await this.recipeRepository.findAndCount({ skip, take });
    const results = rows.map((i) => i.serialize(RecipeEntity));

    return { skip, take, results, count };
  }

  async findOneById(uuid: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { uuid } });
    return recipe;
  }

  async remove(uuid: string): Promise<boolean> {
    return true;
  }
}
