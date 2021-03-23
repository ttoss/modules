import type { ProxyHandler } from 'aws-lambda';

export const proxyHandler: ProxyHandler = async (event, context) => {
  const { httpMethod, path } = event;

  if (httpMethod === 'GET' && ['/now/dayjs', '/now/moment'].includes(path)) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: String(path === '/now/moment' ? 'moment' : 'dayjs'),
    };
  }

  if (httpMethod === 'GET' && path === '/print') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, context }),
    };
  }

  return {
    statusCode: 403,
    body: 'Execute access forbidden',
  };
};
