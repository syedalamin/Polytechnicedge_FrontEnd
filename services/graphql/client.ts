"use client"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";


const httpLink = new HttpLink({
  uri: "http://localhost:5000/api/v1/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
