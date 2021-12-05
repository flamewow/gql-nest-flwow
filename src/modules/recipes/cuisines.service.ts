import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { paginate } from '@core/db/misc/paginate';
import { PaginationCursorArgs } from '@core/db/misc/pagination-args';
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

  async findAll(findOptions?: FindManyOptions<CuisineEntity>): Promise<CuisineEntity[]> {
    return await this.cuisineRepository.find(findOptions);
  }

  async paginated(pagination: PaginationCursorArgs): Promise<PaginatedCuisine> {
    const query = this.cuisineRepository.createQueryBuilder().select();
    const output = await paginate(query, pagination);
    return output;
  }
}
