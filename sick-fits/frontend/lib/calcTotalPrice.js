export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // because products might have been deleted but remain in the cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
