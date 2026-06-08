import { renderOrderSummary } from "./checkout/orderSummary.js";
import { calculateOrder, renderPaymentSummary, updateQuantity } from "./checkout/paymentSummary.js";
import renderHeader from "./checkout/checkoutHeader.js";

renderOrderSummary();
updateQuantity();
calculateOrder();
renderPaymentSummary();
renderHeader();