import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import UseForm from '../lib/UseForm';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      # photo {
      #   altText
      #   image {
      #     publicUrlTrasformed
      #   }
      # }
    }
  }
`;

const UPADTE_PRODUCT_MUTATION = gql`
  mutation UPADTE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, price: $price, description: $description }
    ) {
      id
      name
      price
      description
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. Get the data about the product
  const { error, loading, data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // 2. update product data
  const [
    updateProduct,
    { error: updtError, loading: updtLoading, data: updtData },
  ] = useMutation(UPADTE_PRODUCT_MUTATION);
  // 2.5. Make some state for the form
  const { inputs, handleChange, resetForm, clearForm } = UseForm(data?.Product);
  if (loading) return <p>Loading...</p>;

  // 3. Reflect on UI
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        console.log(res);
      }}
    >
      <DisplayError error={error && updtError} />
      <fieldset disabled={updtLoading} aria-busy={updtLoading}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product ♻️</button>
      </fieldset>
    </Form>
  );
}
