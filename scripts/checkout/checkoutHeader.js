import { cart } from "../../data/cart.js";

export function renderHeader() {
  let itemsQuantity = 0;

  cart.forEach((cartItem) => {
    itemsQuantity += cartItem.quantity;
  });

  const html = `
  Checkout (
        <a class="return-to-home-link" href="amazon.html">
          <div class="js-checkout-quantity">${itemsQuantity} Items</div>
        </a>
        )
  `;

  document.querySelector('.js-checkout-header-quantity').innerHTML = html;
}

export default renderHeader();