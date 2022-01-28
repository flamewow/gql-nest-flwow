import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength, IsUUID } from 'class-validator';

@InputType()
export class NewRecipeInput {
  @Field()
  @IsUUID()
  cuisineUUID: string;

  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];
}
