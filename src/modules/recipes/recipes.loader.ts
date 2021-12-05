import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { In } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class RecipesLoader {
  constructor(private recipesService: RecipesService) {}

  public readonly batchCuisineRecipes = new DataLoader(async (cuisineUUIDs: string[]) => {
    const recipes = await this.recipesService.findAll({ where: { cuisineUUID: In(cuisineUUIDs) } });
    return cuisineUUIDs.map((cuisineUUID) => recipes.filter((recipe) => recipe.cuisineUUID === cuisineUUID));
  });
}
