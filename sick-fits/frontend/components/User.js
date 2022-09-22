import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      # called 'Item' not 'User' because it can be any other thing, like a company
      ... on User {
        # graphQL can return data of type 'User' or other types, hence the '... on TYPE' syntax offers something like a select case statement
        id
        email
        name
        # TODO: query the cart once you have it
      }
    }
  }
`;
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
