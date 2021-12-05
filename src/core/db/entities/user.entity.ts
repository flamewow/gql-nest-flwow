import { USER_ROLES_ENUM } from '@core/enums';
import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { AbstractBaseEntity } from './abstract/abstract-base.entity';

@Entity('users')
@ObjectType({ description: 'user' })
export class UserEntity extends AbstractBaseEntity {
  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: false, unique: true })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ default: USER_ROLES_ENUM.user })
  @Field()
  role: USER_ROLES_ENUM;
}
