import { renderOrderSummary } from "./checkout/orderSummary.js";
import { calculateOrder, renderPaymentSummary, updateQuantity } from "./checkout/paymentSummary.js";
import renderHeader from "./checkout/checkoutHeader.js";
import formatCurrency from "./utils/money.js";
import { cart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later');
  }

  renderOrderSummary();
  updateQuantity();
  calculateOrder();
  renderPaymentSummary();
  renderHeader();
}
loadPage();