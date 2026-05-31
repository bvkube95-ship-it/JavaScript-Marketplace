export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateProductQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}