import { cart } from "../../data/cart.js";
import { productsMap } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function calculateOrder() {
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const option = deliveryOptions.find(
      o => o.id === cartItem.deliveryOptionId
    );

    if (option) {
      shippingPriceCents += option.priceCents;
    }
  });


  let productsPriceCents = 0;

  cart.forEach((cartItem) => {
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

    document.querySelector('.js-total')
      .innerHTML = `$${formatCurrency(totals.productsPriceCents)}`;

    document.querySelector('.js-shipping')
      .innerHTML = `$${formatCurrency(totals.shippingPriceCents)}`

    document.querySelector('.js-total-before-tax')
      .innerHTML = `$${formatCurrency(totals.totalBeforeTaxCents)}`;

    document.querySelector('.js-estimated-tax')
      .innerHTML = `$${formatCurrency(totals.estimatedTaxCents)}`;

    document.querySelector('.js-total-with-tax')
      .innerHTML = `$${formatCurrency(totals.totalWithTaxCents)}`;
}

export function updateQuantity() {
  let itemsQuantity = 0;

  cart.forEach((cartItem) => {
    itemsQuantity += cartItem.quantity;
  });

  const cartQuantity = document.querySelector('.js-cart-quantity');

  if (cartQuantity && itemsQuantity > 0) {
    cartQuantity.innerHTML = itemsQuantity;
  }

  const orderQuantity = document.querySelector('.js-order-quantity');

  if (orderQuantity) {
    orderQuantity.innerHTML = `Items (${itemsQuantity})`;
  }

  const checkoutQuantity = document.querySelector('.js-checkout-quantity');

  if (checkoutQuantity) {
    checkoutQuantity.innerHTML = `${itemsQuantity} Items`;
  }
}
