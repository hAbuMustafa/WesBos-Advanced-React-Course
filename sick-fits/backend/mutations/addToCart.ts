/* eslint-disable */

import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query current user and see if they're logged in
  const session = context.session as Session;
  if (!session.itemId) {
    // remember that authentication items go by the name 'item' because they don't have to be a 'User'
    throw new Error('Gotta be logged in to add an item to the cart');
  }
  // 2. Query current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });

  // 3. See if the current item being added is in the cart. if it was, increment quantity
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `You already have ${existingCartItem.quantity}, will increment quantity`
    );
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 4. otherwise, make new cartItem
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}
