export const cart = [];

export function addToCart(productId, selectedValue) {
  let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += selectedValue;
      } else {
        cart.push({
          productId: productId,
          quantity: selectedValue
        });
      }
}