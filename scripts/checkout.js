import { renderOrderSummary } from "./checkout/orderSummary.js";
import { calculateOrder, renderPaymentSummary, updateQuantity } from "./checkout/paymentSummary.js";
import renderHeader from "./checkout/checkoutHeader.js";
import formatCurrency from "./utils/money.js";
import { cart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
  await loadProductsFetch();

  renderOrderSummary();
  updateQuantity();
  calculateOrder();
  renderPaymentSummary();
  renderHeader();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    resolve();
  })
]).then(() => {
  renderOrderSummary();
  updateQuantity();
  calculateOrder();
  renderPaymentSummary();
  renderHeader();
});
*/