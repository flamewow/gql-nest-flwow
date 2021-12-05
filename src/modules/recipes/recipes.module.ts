import { CuisineEntity } from '@core/db/entities/cuisine.entity';
import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { DateScalar } from '@core/scalars/date.scalar';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuisinesResolver } from './cuisines.resolver';
import { CuisinesService } from './cuisines.service';
import { RecipesLoaders } from './recipes.loader';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CuisineEntity, RecipeEntity]), AuthModule],
  providers: [CuisinesResolver, CuisinesService, RecipesResolver, RecipesService, RecipesLoaders, DateScalar],
})
export class RecipesModule {}
