import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';
/* eslint-disable react/prop-types */
const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
        name
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: query.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Order } = data;
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {Order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{Order.id}</span>
      </p>
      <p>
        <span>Invoice No.:</span>
        <span>{Order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(Order.total)}</span>
      </p>
      <p>
        <span>Number of Items:</span>
        <span>{Order.items.length}</span>
      </p>
      <div className="items">
        {Order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub-total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
