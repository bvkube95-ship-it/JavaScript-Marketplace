export function enterListener() {
  const input = document.querySelector('.js-search-bar');
    
  input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value) {
        window.location.href = 'index.html';
      }
    });
}
export default enterListener;
