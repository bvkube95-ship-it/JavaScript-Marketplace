import { renderOrderSummary } from "./checkout/orderSummary.js";
import { calculateOrder, renderPaymentSummary, updateQuantity } from "./checkout/paymentSummary.js";
import renderHeader from "./checkout/checkoutHeader.js";
import formatCurrency from "./utils/money.js";

import "../data/cart-class.js";

renderOrderSummary();
updateQuantity();
calculateOrder();
renderPaymentSummary();
renderHeader();