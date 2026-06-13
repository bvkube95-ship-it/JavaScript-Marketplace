import { loadProductsFetch } from "../data/products.js";
import { renderOrders } from "./orders/renderOrders.js";
import { updateQuantity } from "./checkout/paymentSummary.js";

async function loadPage() {
  await loadProductsFetch();
  renderOrders();
  updateQuantity();
}

loadPage();