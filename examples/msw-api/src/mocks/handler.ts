import { graphql } from 'msw';

export const handlers = [
  graphql.query('UsersQuery', (_req, res, ctx) => {
    return res(
      ctx.data({
        users: {
          edges: [...new Array(10)].map((_, index) => {
            return {
              cursor: `cursor-${index}`,
              node: {
                id: `user-id-${index}`,
                name: `user-name-${index}`,
              },
            };
          }),
          pageInfo: {
            hasNextPage: false,
            endCursor: '2',
          },
        },
      })
    );
  }),
];
