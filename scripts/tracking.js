import { loadProductsFetch } from "../data/products.js";
import renderTracking from "./tracking/renderTracking.js";
import enterListener from "./utils/enterListener.js";

async function loadPage() {
  await loadProductsFetch();
  renderTracking();
  enterListener();
}
loadPage();