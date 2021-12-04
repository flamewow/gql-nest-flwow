import { PaginationInfo } from './page-info';
import { SelectQueryBuilder, MoreThan, LessThan } from 'typeorm';
import { PaginationCursorArgs } from './pagination-args';

export async function paginate<T>(query: SelectQueryBuilder<T>, paginationArgs: PaginationCursorArgs, cursorColumn = 'uuid', defaultLimit = 25): Promise<any> {
  query.orderBy({ [cursorColumn]: 'DESC' });
  const initialQuery = query.clone();

  // FORWARD pagination
  if (paginationArgs.first) {
    if (paginationArgs.after) {
      const offsetId = Buffer.from(paginationArgs.after, 'base64').toString('ascii');
      query.where({ [cursorColumn]: MoreThan(offsetId) });
    }

    const limit = paginationArgs.first ?? defaultLimit;

    query.take(limit);
  }

  // REVERSE pagination
  else if (paginationArgs.last && paginationArgs.before) {
    const offsetId = Buffer.from(paginationArgs.before, 'base64').toString('ascii');
    const limit = paginationArgs.last ?? defaultLimit;

    query.where({ [cursorColumn]: LessThan(offsetId) }).take(limit);
  }

  const result = await query.getMany();

  const startCursorId: number = result.length > 0 ? result[0][cursorColumn] : null;
  const endCursorId: number = result.length > 0 ? result.slice(-1)[0][cursorColumn] : null;

  let countBefore = 0;
  let countAfter = 0;

  if (initialQuery.expressionMap.wheres?.length) {
    countBefore = await initialQuery.clone().andWhere(`${cursorColumn} < :cursor`, { cursor: startCursorId }).getCount();
    countAfter = await initialQuery.clone().andWhere(`${cursorColumn} > :cursor`, { cursor: endCursorId }).getCount();
  } else {
    countBefore = await initialQuery.clone().where(`${cursorColumn} > :cursor`, { cursor: startCursorId }).getCount();
    countAfter = await initialQuery.clone().where(`${cursorColumn} < :cursor`, { cursor: endCursorId }).getCount();
  }

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(`${value[cursorColumn]}`).toString('base64'),
    };
  });

  const paginationInfo = new PaginationInfo({
    countBefore,
    countAfter,
    countTotal: countBefore + edges.length + countAfter,
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges.slice(-1)[0].cursor : null,
  });

  return { edges, paginationInfo };
}
