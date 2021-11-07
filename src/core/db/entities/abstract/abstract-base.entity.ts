import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import _ from 'lodash';

export class AbstractBaseEntity {
  serialize<T>(dto: ClassConstructor<T>): T {
    return plainToClass(dto, this, { excludeExtraneousValues: true });
  }
}
