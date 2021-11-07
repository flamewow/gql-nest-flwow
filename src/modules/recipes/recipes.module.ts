import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../../core/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
