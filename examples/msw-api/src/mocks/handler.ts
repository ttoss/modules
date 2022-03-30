import { graphql } from 'msw';

export const handlers = [
  graphql.query('users', (req, res, ctx) => {
    return res(
      ctx.data({
        edges: [],
        pageInfo: {
          hasNextPage: false,
        },
      })
    );
  }),
];
