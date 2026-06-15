const popup = document.querySelector('.js-popup');
const overlay = document.querySelector('.js-popup-overlay');
const closeBtn = document.querySelector('.js-popup-close');

export function showPopup() {
  popup.style.display = 'block';
  overlay.style.display = 'block';

  popup.addEventListener('click', () => {
    window.location.href = 'checkout.html'
  })
}

function closePopup() {
  popup.style.display = 'none';
  overlay.style.display = 'none';
}

closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);