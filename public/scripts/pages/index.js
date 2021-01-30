const loadingEl = document.querySelector('.js-loading')

const onIntersection = () => {
  fetch('/api/new-tesselations')
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