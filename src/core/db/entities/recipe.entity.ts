import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';

@Entity('recipe')
@ObjectType({ description: 'recipe ' })
export class RecipeEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  uuid: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column('text', { array: true })
  @Field((type) => [String])
  ingredients: string[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
