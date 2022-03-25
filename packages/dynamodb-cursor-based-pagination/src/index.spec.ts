import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';

import { PaginateConfig, paginate } from './';

/**
 * Don't change this value else tests will fail.
 */
const NUMBER_OF_ITEMS_TO_POPULATE_TABLE = 100;

let dynamoDBClient: DynamoDBClient;

const tableName = 'DynamoDBCursorBasedPagination';
const hashKey = 'pk';
const hashKeyValue = 'DynamoDBCursorBasedPagination';
const rangeKey = 'sk';

beforeAll(async () => {
  /**
   * Clients setup
   */
  dynamoDBClient = new DynamoDBClient({
    endpoint: `http://0.0.0.0:8000`,
    region: 'us-west-2',
    credentials: {
      accessKeyId: 'fakeMyKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
    },
  });

  const documentClient = DynamoDBDocument.from(dynamoDBClient);

  const items = [...new Array(NUMBER_OF_ITEMS_TO_POPULATE_TABLE)].map(
    (_, index) => {
      const newIndex = index + 1000;
      const rangeKeyValue = `cursor-${newIndex}`;

      return {
        [hashKey]: hashKeyValue,
        [rangeKey]: rangeKeyValue,
        index: newIndex,
        parity: newIndex & 1 ? 'ODD' : 'EVEN',
      };
    }
  );

  await Promise.all(
    items.map((item) => {
      return documentClient.send(
        new PutCommand({
          TableName: tableName,
          Item: item,
        })
      );
    })
  );

  documentClient.destroy();
});

afterAll(() => {
  dynamoDBClient?.destroy();
});

/**
 * Wrap paginate and return only cursor (range key) values.
 */
const testPaginate = async (params: Partial<PaginateConfig>) => {
  const { edges, pageInfo } = await paginate({
    dynamoDBClient,
    tableName,
    hashKey,
    hashKeyValue,
    rangeKey,
    ...params,
  });

  return { edges: edges.map(({ cursor }) => cursor), pageInfo };
};

test('throw error if first is negative', () => {
  return expect(testPaginate({ first: -1 })).rejects.toThrow();
});

test('throw error if last is negative', () => {
  return expect(testPaginate({ last: -1 })).rejects.toThrow();
});

test('default args', async () => {
  const { edges, pageInfo } = await testPaginate({});

  expect(edges).toHaveLength(NUMBER_OF_ITEMS_TO_POPULATE_TABLE);
  expect(pageInfo).toEqual({
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: `cursor-${1000 + NUMBER_OF_ITEMS_TO_POPULATE_TABLE - 1}`,
    endCursor: `cursor-${1000}`,
  });
});

test.each<[Partial<PaginateConfig>, any]>([
  [
    {
      after: `cursor-${1000 + NUMBER_OF_ITEMS_TO_POPULATE_TABLE}`,
      sort: 'ASC',
    },
    {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: true,
      },
    },
  ],
  [
    {
      sort: 'ASC',
      first: 3,
    },
    {
      edges: ['cursor-1000', 'cursor-1001', 'cursor-1002'],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: true,
        startCursor: 'cursor-1000',
        endCursor: 'cursor-1002',
      },
    },
  ],
  [
    {
      sort: 'ASC',
      after: 'cursor-1095',
    },
    {
      edges: ['cursor-1096', 'cursor-1097', 'cursor-1098', 'cursor-1099'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: 'cursor-1096',
        endCursor: 'cursor-1099',
      },
    },
  ],
  [
    {
      sort: 'ASC',
      after: 'cursor-1020',
      first: 3,
    },
    {
      edges: ['cursor-1021', 'cursor-1022', 'cursor-1023'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
        startCursor: 'cursor-1021',
        endCursor: 'cursor-1023',
      },
    },
  ],
  [
    {
      sort: 'ASC',
      after: 'cursor-1097',
      first: 10,
    },
    {
      edges: ['cursor-1098', 'cursor-1099'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: 'cursor-1098',
        endCursor: 'cursor-1099',
      },
    },
  ],
  [
    {
      sort: 'ASC',
      beginsWith: 'cursor-100',
      after: '5',
      first: 6,
    },
    {
      edges: ['6', '7', '8', '9'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: '6',
        endCursor: '9',
      },
    },
  ],
  [
    { before: 'cursor-999', sort: 'DESC' },
    {
      edges: [],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
    },
  ],
  [
    {
      sort: 'DESC',
      first: 3,
    },
    {
      edges: ['cursor-1099', 'cursor-1098', 'cursor-1097'],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: true,
        startCursor: 'cursor-1099',
        endCursor: 'cursor-1097',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      after: 'cursor-1005',
    },
    {
      edges: [
        'cursor-1004',
        'cursor-1003',
        'cursor-1002',
        'cursor-1001',
        'cursor-1000',
      ],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: 'cursor-1004',
        endCursor: 'cursor-1000',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      after: 'cursor-1014',
      first: 3,
    },
    {
      edges: ['cursor-1013', 'cursor-1012', 'cursor-1011'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
        startCursor: 'cursor-1013',
        endCursor: 'cursor-1011',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      beginsWith: 'cursor-100',
      after: '5',
      first: 6,
    },
    {
      edges: ['4', '3', '2', '1', '0'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: '4',
        endCursor: '0',
      },
    },
  ],
  [
    { before: 'cursor-1100', sort: 'DESC' },
    {
      edges: [],
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
    },
  ],
  [
    {
      sort: 'DESC',
      last: 3,
    },
    {
      edges: ['cursor-1002', 'cursor-1001', 'cursor-1000'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: false,
        startCursor: 'cursor-1002',
        endCursor: 'cursor-1000',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      before: 'cursor-1096',
    },
    {
      edges: ['cursor-1099', 'cursor-1098', 'cursor-1097'],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: true,
        startCursor: 'cursor-1099',
        endCursor: 'cursor-1097',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      before: 'cursor-1030',
      last: 3,
    },
    {
      edges: ['cursor-1033', 'cursor-1032', 'cursor-1031'],
      pageInfo: {
        hasPreviousPage: true,
        hasNextPage: true,
        startCursor: 'cursor-1033',
        endCursor: 'cursor-1031',
      },
    },
  ],
  [
    {
      sort: 'DESC',
      beginsWith: 'cursor-100',
      before: '5',
      last: 6,
    },
    {
      edges: ['9', '8', '7', '6'],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: true,
        startCursor: '9',
        endCursor: '6',
      },
    },
  ],
])('test config %#', async (args, response) => {
  return expect(testPaginate(args)).resolves.toEqual(response);
});

test('return only hashKey', async () => {
  const response = await paginate({
    dynamoDBClient,
    tableName,
    hashKey,
    hashKeyValue,
    rangeKey,
    first: 1,
    projectionExpression: hashKey,
  });
  expect(Object.keys(response.edges[0].node)).toEqual([hashKey]);
});

test('return only hashKey and rangeKey', async () => {
  const response = await paginate({
    dynamoDBClient,
    tableName,
    hashKey,
    hashKeyValue,
    rangeKey,
    first: 1,
    projectionExpression: [hashKey, rangeKey].join(','),
  });
  expect(Object.keys(response.edges[0].node).sort()).toEqual(
    [hashKey, rangeKey].sort()
  );
});

test('return only items whose cursor > 1050', async () => {
  const { pageInfo } = await paginate({
    dynamoDBClient,
    tableName,
    hashKey,
    hashKeyValue,
    rangeKey,
    filterExpression: '#index > :index',
    filterAttributeNames: {
      '#index': 'index',
    },
    filterAttributeValues: {
      ':index': 1050,
    },
  });
  expect(pageInfo).toEqual(
    expect.objectContaining({
      startCursor: 'cursor-1099',
      endCursor: 'cursor-1051',
    })
  );
});

test('return only even cursors', async () => {
  const { edges } = await paginate<{ parity: string }>({
    dynamoDBClient,
    tableName,
    hashKey,
    hashKeyValue,
    rangeKey,
    filterExpression: '#parity = :parity',
    filterAttributeNames: {
      '#parity': 'parity',
    },
    filterAttributeValues: {
      ':parity': 'EVEN',
    },
  });
  const parityValues = Array.from(
    new Set(edges.map(({ node }) => node.parity))
  );
  expect(parityValues).toEqual(['EVEN']);
});
