import { orders } from "../../data/orders.js";
import { productsMap } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import addBusinessDays from "../utils/date.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { updateQuantity } from "../checkout/paymentSummary.js";

export function renderOrders() {
  let ordersHTML = '';

  orders.forEach((order) => {
    if (!order.products) return;
    const orderDate = dayjs(order.orderTime).format('MMMM D');

    let productsHTML = '';

    order.products.forEach((orderProduct) => {
      const product = productsMap[orderProduct.productId]; // ← добавь эту строку
      if (!product) return;

      const deliveryOption = deliveryOptions.find(
        (option) => option.id === orderProduct.deliveryOptionId
      ) ?? deliveryOptions[0];

      const deliveryDate = addBusinessDays(
        dayjs(order.orderTime),
        deliveryOption.deliveryDays
      ).format('MMMM D');

      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
          <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsHTML}
        </div>
      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML =
    ordersHTML || '<p>No orders yet.</p>';
}