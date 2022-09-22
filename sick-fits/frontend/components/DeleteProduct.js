import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      price
      description
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}
export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm(`Are ya sure you wanna delete dis fella?`)) {
          const res = await deleteProduct().catch((err) => alert(err.message));
          console.error(`Product ${res.data.deleteProduct.name} DELETED!`);
        }
      }}
    >
      {children}
    </button>
  );
}
