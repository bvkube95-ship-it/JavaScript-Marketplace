import { loadProductsFetch } from "../data/products.js";
import renderTracking from "./tracking/renderTracking.js";

async function loadPage() {
  await loadProductsFetch();
  renderTracking();;
}
loadPage();