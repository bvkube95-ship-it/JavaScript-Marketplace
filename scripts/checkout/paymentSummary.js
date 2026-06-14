import { cart } from "../../data/cart-class.js";
import { productsMap } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function calculateOrder() {
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const option = deliveryOptions.find(
      o => o.id === cartItem.deliveryOptionId
    );

    if (option) {
      shippingPriceCents += option.priceCents;
    }
  });


  let productsPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const matchingItem = productsMap[cartItem.productId];

    productsPriceCents +=
      matchingItem.priceCents * cartItem.quantity;
  });

  let totalBeforeTaxCents;

  if (productsPriceCents > 0) {
    totalBeforeTaxCents =
      productsPriceCents + shippingPriceCents;
  } else {
    totalBeforeTaxCents = 0;
  }

  const taxRate = 0.1;

  const estimatedTaxCents = Math.round(totalBeforeTaxCents * taxRate);
  const totalWithTaxCents = totalBeforeTaxCents + estimatedTaxCents;

  return {
    productsPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    estimatedTaxCents,
    totalWithTaxCents
  }
}

export function renderPaymentSummary() {
    const totals = calculateOrder();

    let itemsQuantity = 0;
    cart.cartItems.forEach((cartItem) => {
      itemsQuantity += cartItem.quantity;
    });

    const html = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div class="js-order-quantity">Items (${itemsQuantity}):</div>
          <div class="payment-summary-money js-total">$${formatCurrency(totals.productsPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-shipping">$${formatCurrency(totals.shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money js-total-before-tax">$${formatCurrency(totals.totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money js-estimated-tax">$${formatCurrency(totals.estimatedTaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-total-with-tax">$${formatCurrency(totals.totalWithTaxCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = html;

    document.querySelector('.js-place-order')
      .addEventListener('click', async () => {
        if (cart.cartItems.length === 0) {
          alert('Your cart is empty!');
          return;
        }
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: cart.cartItems
            })
          });

          const order = await response.json();

            order.products = order.products?.map((product) => ({
              ...product,
              deliveryOptionId: cart.cartItems.find(
                (item) => item.productId === product.productId
              )?.deliveryOptionId
            }));

            addOrder(order);

            cart.cartItems = [];
            cart.saveToStorage();
            window.location.href = 'orders.html';
            
        }  catch (error) {
          console.log(error)
        }
      });
}

export function updateQuantity() {
  let itemsQuantity = 0;

  cart.cartItems.forEach((cartItem) => {
    itemsQuantity += cartItem.quantity;
  });

  const cartQuantity = document.querySelector('.js-cart-quantity');

  if (cartQuantity && itemsQuantity > 0) {
    cartQuantity.innerHTML = itemsQuantity;
  }
}
updateQuantity();