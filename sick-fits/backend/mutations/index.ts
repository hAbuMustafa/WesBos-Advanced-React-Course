import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

// Just a fake variable to use in typeDefs so the syntax highlighting for gql works in the editor
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  // Defines the Types (TypeDefinition) of actions that can be done
  typeDefs: graphql`
    type Mutation {
      addToCart(productId: ID): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
