import { loadProductsFetch, productsMap } from "../../data/products.js";
import { getOrder } from "../../data/orders.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import addBusinessDays from "../utils/date.js";
import { updateQuantity } from "../checkout/paymentSummary.js";
import enterListener from "../utils/enterListener.js";

export async function renderTracking() {
  await loadProductsFetch();
  
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);

  const orderItem = order.products.find(p => p.productId === productId);
  const deliveryOption = deliveryOptions.find(
    d => d.id === orderItem.deliveryOptionId
  ) ?? deliveryOptions[0];

  const deliveryDate = addBusinessDays(
    dayjs(order.orderTime).startOf('day'),
    deliveryOption.deliveryDays
  );
  const deliveryDateFormatted = deliveryDate.format('dddd, MMMM D');

  const product = productsMap[orderItem.productId];

  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderItem.estimatedDeliveryTime);
  const now = dayjs();

  const totalTime = deliveryTime - orderTime;
  const elapsed = now - orderTime;
  const progress = Math.min(Math.round((elapsed / totalTime) * 100), 100);

  let status;
  if (progress < 50) {
    status = 'preparing'
  } else if (progress < 100) {
    status = 'shipped'
  } else {
    status = 'delivered';
  }

  const trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDateFormatted}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderItem.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${status === 'preparing'
            ? 'current-status'
            : ''
          }">
            Preparing
          </div>
          <div class="progress-label ${status === 'shipped'
            ? 'current-status'
            : ''
          }">
            Shipped
          </div>
          <div class="progress-label ${status === 'delivered' 
            ? 'current-status' 
            : ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  enterListener();
}

export default renderTracking;