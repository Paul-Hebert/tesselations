export function toast(element) {
  let timeout;

  const hide = () => {
    element.classList.remove('is-visible');
  }

  const show = (message) => {
    element.innerHTML = message;
    element.classList.add('look-at-me');
    element.classList.add('is-visible');

    if (timeout) clearTimeout(timeout);
  
    timeout = setTimeout(() => {
      hide();
    }, 5000);
  }

  element.addEventListener('click', () => {
    hide();
  });

  return {
    element,
    hide,
    show
  }
}