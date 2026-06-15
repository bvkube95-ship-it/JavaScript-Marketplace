import { loadProductsFetch } from "../data/products.js";
import { renderOrders } from "./orders/renderOrders.js";
import { updateQuantity } from "./checkout/paymentSummary.js";
import enterListener from "./utils/enterListener.js";

async function loadPage() {
  await loadProductsFetch();
  renderOrders();
  updateQuantity();
  enterListener();
}

loadPage();