import { copyCode } from '../utils/copy-code.js';
import { toast } from '../utils/toast.js';

initLazyLoading();
initCssCopyButtons();

function initLazyLoading() {
  const loadingEl = document.querySelector('.js-loading')

  // count is defined in the HTML
  const batchSize = count;

  const onIntersection = () => {
    count += batchSize;

    fetch(`/api/fetch-more?start=${count}&count=${batchSize}`)
      .then(response => response.json())
      .then(data => {
        let newCards = [];
        data.forEach(tesselation => {
          newCards.push(newCard(tesselation));
        });

        document.querySelector('.js-listings').innerHTML += newCards.join('');
      });
  }

  const observer = new IntersectionObserver(onIntersection, {threshold: 0})

  observer.observe(loadingEl)
}

function initCssCopyButtons() {
  const toastInstance = toast(document.querySelector('.js-toast'));

  if (!toastInstance) return;

  document.addEventListener('click', ({ target }) => {
    if (target.classList.contains('js-card-copy-css')) {
      const card = target.closest('.js-card');
      if (!card) return;

      const graphic = card.querySelector('.js-card-graphic');
      if (!graphic) return;

      const css = graphic.getAttribute('style');

      copyCode(css).then(() => {
        toastInstance.show('CSS code copied to clipboard.');
      });
    }
  });
}