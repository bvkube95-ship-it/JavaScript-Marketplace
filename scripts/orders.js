import { loadProductsFetch } from "../data/products.js";
import { renderOrders } from "./orders/renderOrders.js";

async function loadPage() {
  await loadProductsFetch();
  renderOrders();
}
loadPage();