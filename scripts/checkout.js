import { renderOrderSummary } from "./checkout/orderSummary.js";
import { calculateOrder, renderPaymentSummary, updateQuantity } from "./checkout/paymentSummary.js";

renderOrderSummary();
updateQuantity();
calculateOrder();
renderPaymentSummary();