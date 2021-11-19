import { Field, ID, ObjectType } from '@nestjs/graphql';
import _ from 'lodash';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType({ isAbstract: true })
export class AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  uuid: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
