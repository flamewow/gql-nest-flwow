import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { In } from 'typeorm';
import { CuisinesService } from './cuisines.service';

@Injectable({ scope: Scope.REQUEST })
export class CuisinesLoader {
  constructor(private cuisineService: CuisinesService) {}

  public readonly batchCuisines = new DataLoader(async (cuisineUUIDs: string[]) => {
    const cuisines = await this.cuisineService.findAll({ where: { uuid: In(cuisineUUIDs) } });
    return cuisineUUIDs.map((cuisineUUID) => cuisines.find((cuisine) => cuisine.uuid === cuisineUUID));
  });
}
