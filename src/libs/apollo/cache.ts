import { InMemoryCache, Reference } from '@apollo/client';

// create an inmemory cache instance for caching graphql data
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isSomething: () => {
          return isSomethingVar();
        },
        // todos: {
        //   keyArgs: false,
        //   merge(existing, incoming) {
        //     console.log(`merge -> incoming`, incoming.todos);
        //     console.log(`merge -> existing`, existing);
        //     let todos: Reference[] = [];
        //     if (existing && existing.todos) {
        //       todos = todos.concat(existing.todos);
        //     }
        //     if (incoming && incoming.todos) {
        //       todos = todos.concat(incoming.todos);
        //     }
        //     return { todos };
        //   },
        // },
      },
    },
  },
});

export const isSomethingVar = cache.makeVar<boolean>(false);

export default cache;
