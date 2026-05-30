export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, selectedValue) {
  let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += Number(selectedValue);
      } else {
        cart.push({
          productId: productId,
          quantity: Number(selectedValue)
        });
      }
      saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}