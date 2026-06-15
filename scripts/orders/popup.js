import { productsMap } from "../../data/products.js";

const popup = document.querySelector('.js-popup');
const overlay = document.querySelector('.js-popup-overlay');
const closeBtn = document.querySelector('.js-popup-close');
const dontAsk = document.querySelector('.js-dont-ask');
const confirmBtn = document.querySelector('.popup-btn--confirm');

export function showPopup() {
  if (sessionStorage.getItem('dontAskCart') === 'true') {
    window.location.href = 'checkout.html';
    return;
  }
  popup.style.display = 'block';
  overlay.style.display = 'block';
}

function closePopup() {
  if (dontAsk.checked) {
    sessionStorage.setItem('dontAskCart', 'true');
  }
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

confirmBtn.addEventListener('click', () => {
  closePopup();
  window.location.href = 'checkout.html';
});
closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);