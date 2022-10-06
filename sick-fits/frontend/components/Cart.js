import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  p,
  h3 {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartIsOpen, closeCart } = useCart();

  if (!me) return null; // Don't show cart when not signedin
  console.log(me);
  return (
    <CartStyles open={cartIsOpen}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
