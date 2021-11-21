import { PaginatedRecipe } from '@core/db/entities/recipe.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate } from '@core/db/misc/paginate';
import { PaginationArgs } from '@core/db/misc/pagination-args';
import { CuisineEntity, PaginatedCuisine } from '@core/db/entities/cuisine.entity';

@Injectable()
export class CuisinesService {
  private logger = new Logger(this.constructor.name);

  constructor(
    @InjectRepository(CuisineEntity)
    private cuisineRepository: Repository<CuisineEntity>,
  ) {}

  async create(name: string): Promise<CuisineEntity> {
    const cuisine = await this.cuisineRepository.create({ name });
    const insertionResults = await this.cuisineRepository.insert(cuisine);
    if (insertionResults) {
      this.logger.log(insertionResults);
    }
    return cuisine;
  }

  async paginated(pagination: PaginationArgs): Promise<PaginatedCuisine> {
    const query = this.cuisineRepository.createQueryBuilder().select();
    const output = await paginate(query, pagination);
    return output;
  }
}