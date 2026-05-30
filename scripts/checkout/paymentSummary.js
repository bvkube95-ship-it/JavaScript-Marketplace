import { cart } from "../../data/cart.js";
import { productsMap } from "../checkout.js";
import { formatCurrency } from "../utils/money.js";

export function calculateOrder() {
  const shippingPriceCents = 499;

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
    totalBeforeTaxCents,
    estimatedTaxCents,
    totalWithTaxCents
  }
}

export function renderPaymentSummary() {
    const totals = calculateOrder();

    document.querySelector('.js-total')
      .innerHTML = `$${formatCurrency(totals.productsPriceCents)}`;

    document.querySelector('.js-total-before-tax')
      .innerHTML = `$${formatCurrency(totals.totalBeforeTaxCents)}`;

    document.querySelector('.js-estimated-tax')
      .innerHTML = `$${formatCurrency(totals.estimatedTaxCents)}`;

    document.querySelector('.js-total-with-tax')
      .innerHTML = `$${formatCurrency(totals.totalWithTaxCents)}`;
}

export function updateQuantity() {
  let summaryQuantity = 0;

  cart.forEach((cartItem) => {
    summaryQuantity += cartItem.quantity;
  });

  document.querySelector('.js-summary-quantity')
    .innerHTML = `Items (${summaryQuantity})`;
}