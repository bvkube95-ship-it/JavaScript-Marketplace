import { cart, removeFromCart, updateProductQuantity, updateDeliveryOption } from "../../data/cart.js";
import { productsMap } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { renderPaymentSummary, updateQuantity } from "./paymentSummary.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderHeader } from "./checkoutHeader.js";
import addBusinessDays from "../utils/date.js";

function deliveryOptionsHTML(matchingItem, cartItem, today) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = addBusinessDays(today, deliveryOption.deliveryDays);
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingItem.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input
          type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}"
          value="${deliveryOption.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function handleDeleteClick(productId) {
  removeFromCart(productId);

  renderOrderSummary();
  updateQuantity();
  renderPaymentSummary();
  renderHeader();
}

export function renderOrderSummary() {
  const today = dayjs();
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingItem = productsMap[cartItem.productId];

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption =
      deliveryOptions.find((option) => option.id === deliveryOptionId)
      ?? deliveryOptions[0];

    const deliveryDate = addBusinessDays(today, deliveryOption.deliveryDays);
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingItem.image}">

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

              <input
                data-product-id="${matchingItem.id}"
                type="number" min="1" max="50"
                class="js-quantity-input js-quantity-input-${matchingItem.id}">

              <span
                class="link-primary js-save-button js-save-button-${matchingItem.id}"
                data-product-id="${matchingItem.id}">
                Save
              </span>

              <span
                class="delete-quantity-link link-primary js-delete-button"
                data-product-id="${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingItem, cartItem, today)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      handleDeleteClick(deleteButton.dataset.productId);
    });
  });

  document.querySelectorAll('.js-update-button').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const container = document.querySelector(`.js-item-container-${updateButton.dataset.productId}`);
      container.classList.add('editing-container');
    });
  });

  document.querySelectorAll('.js-save-button').forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const productId = saveButton.dataset.productId;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let newQuantity = Number(quantityInput.value);

      if (newQuantity < 1) {
        alert('Minimum is 1');
        newQuantity = 1;
      }
      if (newQuantity > 50) {
        alert('Maximum is 50');
        newQuantity = 50;
      }

      document.querySelector(`.js-item-container-${productId}`).classList.remove('editing-container');

      updateProductQuantity(productId, newQuantity);

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

      updateQuantity();
      renderPaymentSummary();
      renderHeader();
    });
  });

  document.querySelectorAll('.js-quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.querySelector(`.js-save-button-${input.dataset.productId}`).click();
      }
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}