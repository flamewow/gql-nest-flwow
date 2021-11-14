import { USER_ROLES_ENUM } from '@core/enums';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';

@Entity('users')
@ObjectType({ description: 'user' })
export class UserEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  uuid: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: false, unique: true })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column()
  @Field()
  role: USER_ROLES_ENUM;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
