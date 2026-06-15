import { cart } from "../../data/cart-class.js";

export function renderHeader() {
  let itemsQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    itemsQuantity += cartItem.quantity;
  });

  const html = `
  Checkout (
        <a class="return-to-home-link" href="index.html">
          <div class="js-checkout-quantity">${itemsQuantity} Items</div>
        </a>
        )
  `;

  document.querySelector('.js-checkout-header-quantity').innerHTML = html;
}

export default renderHeader;