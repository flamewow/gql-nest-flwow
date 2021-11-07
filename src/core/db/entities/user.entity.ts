import { USER_ROLES_ENUM } from '@core/enums';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';

@Entity('users')
@ObjectType({ description: 'users ' })
export class UserEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  inviteCode: string;

  @Column({ default: 0 })
  currentCanvas: number;

  @Column()
  role: USER_ROLES_ENUM;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
