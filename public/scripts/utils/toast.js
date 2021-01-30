export function toast(element) {
  const hide = () => {
    element.classList.remove('is-visible');
  }
  const show = (message) => {
    element.innerHTML = message;
    element.classList.add('is-visible');
  
    setTimeout(() => {
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