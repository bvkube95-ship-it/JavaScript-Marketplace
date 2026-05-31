import { 
  cart,
  removeFromCart,
  saveToStorage,
  updateProductQuantity
} from "../data/cart.js";

import { 
  products,
  productsMap
} from "../data/products.js";

import { 
  formatCurrency
} from "./utils/money.js";

import { 
  calculateOrder,
  renderPaymentSummary,
  updateQuantity 
} from "./checkout/paymentSummary.js";

let cartSummaryHTML = '';


products.forEach((product) => {
  productsMap[product.id] = product;
});

cart.forEach((cartItem) => {
  const matchingItem = productsMap[cartItem.productId];

  cartSummaryHTML += `
      <div class="cart-item-container js-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">
                ${cartItem.quantity}
                </span>
              </span>

              <span
                class="update-quantity-link link-primary js-update-button js-update-button-${matchingItem.id}"
                data-product-id="${matchingItem.id}">
                Update
              </span>

              <input data-product-id="${matchingItem.id}"
              type="number" min="1" max="10"
              class="js-quantity-input js-quantity-input-${matchingItem.id}">

              <span
                class="link-primary js-save-button js-save-button-${matchingItem.id}"
                data-product-id="${matchingItem.id}">
                Save
              </span>

              <span class="delete-quantity-link link-primary js-delete-button"
              data-product-id="${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

function handleDeleteClick(productId) {
  removeFromCart(productId);

  const container = document.querySelector(
    `.js-item-container-${productId}`
  );

  if (container) {
    container.remove();
  }

  updateQuantity();
  renderPaymentSummary();
}

document.querySelectorAll('.js-delete-button')
  .forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;

      handleDeleteClick(productId);
    });
  });

document.querySelectorAll('.js-update-button')
    .forEach((updateButton) => {
      updateButton.addEventListener('click', () => {
        const productId = updateButton.dataset.productId;

        const container = document.querySelector(`.js-item-container-${productId}`);
        container.classList.add('editing-container');
      });
  });

document.querySelectorAll('.js-save-button')
  .forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const productId = saveButton.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      let newQuantity = Number(quantityInput.value);

      if (newQuantity < 1) {
        alert(`Minimum is 1`);
        newQuantity = 1;
      }
      if (newQuantity > 10) {
        alert(`Maximum is 10`);
        newQuantity = 10;
      }

      const container = document.querySelector(`.js-item-container-${productId}`);
      container.classList.remove('editing-container');

      updateProductQuantity(productId, newQuantity);

       document.querySelector(`.js-quantity-label-${productId}`)
        .innerHTML = newQuantity;

      updateQuantity();
      renderPaymentSummary();
    });
  });

document.querySelectorAll('.js-quantity-input')
      .forEach((input) => {
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const productId = input.dataset.productId;

            const saveButton = document.querySelector(
              `.js-save-button-${productId}`
            );

            saveButton.click();
          }
        });
      });

updateQuantity();
calculateOrder();
renderPaymentSummary();