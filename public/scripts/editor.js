import {skeleton} from './skeleton.js';

const editor = document.querySelector('.js-editor');
const backgroundTarget = document.querySelector('.js-editor-background-target');
const svgTarget = document.querySelector('.js-editor-svg-target');
const svgCodeTarget = document.querySelector('.js-editor-svg-code-target');
const cssCodeTarget = document.querySelector('.js-editor-css-code-target');
const downloadLink = document.querySelector('.js-editor-download-link');

[...editor.querySelectorAll('input')].forEach(input => {
  input.addEventListener('input', e => {
    const newData = getFormObj(editor);
    // baseData is defined in the template.
    const mergedData = {...baseData, ...newData};
    const svg = skeleton(mergedData);
    const backgroundCSS = `url(data:image/svg+xml;base64,${btoa(svg)})`;
    const downloadUrl = `/download?${new URLSearchParams(mergedData).toString()}`;

    const query = new URLSearchParams(newData).toString();
    history.replaceState({}, '', `${window.location.pathname}?${query}`);

    window.requestAnimationFrame(() => {
      if(backgroundTarget) {
        backgroundTarget.style.backgroundImage = backgroundCSS;
        backgroundTarget.style.backgroundSize = `${mergedData.size}px`;
      }
      
      if (cssCodeTarget) cssCodeTarget.innerText = `
background-image: ${backgroundCSS};
background-size: ${mergedData.size}px;`.trim();
  
      if (svgTarget) svgTarget.innerHTML = svg;
      if (svgCodeTarget) svgCodeTarget.innerText = svg;

      if(downloadLink) downloadLink.href = downloadUrl;
    });
  });
});

function getFormObj(form) {
  return  [...new FormData(form)].reduce((prev, [key,val]) => {
     return Object.assign(prev, {[key] : val}) ; 
   }, {}) ; 
 }