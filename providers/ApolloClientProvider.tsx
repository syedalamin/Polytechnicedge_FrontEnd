'use client';
import { client } from '@/services/graphql/client';
 import { ApolloProvider } from '@apollo/client/react';
 
import { ReactNode } from 'react';

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};