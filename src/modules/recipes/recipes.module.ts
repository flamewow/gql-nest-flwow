import { RecipeEntity } from '@core/db/entities/recipe.entity';
import { DateScalar } from '@core/scalars/date.scalar';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity]), AuthModule],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
