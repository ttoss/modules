import * as React from 'react';
import { Flex, Heading } from '@ttoss/ui';
import { LazyLoadUsers, QueryLoaderUsers } from '../components/Users/Users';

const RelayQueryLoaderVsLazyLoadQueryPage = () => {
  return (
    <>
      <Flex sx={{ flexDirection: 'column' }}>
        <Heading as="h1">Relay Query Loader vs Lazy Load Query</Heading>
        <Heading as="h2">Relay Query Loader</Heading>
        <QueryLoaderUsers />
        <Heading as="h2">Lazy Load Query</Heading>
        <React.Suspense fallback="Loading...">
          <LazyLoadUsers />
        </React.Suspense>
      </Flex>
    </>
  );
};

export default RelayQueryLoaderVsLazyLoadQueryPage;
