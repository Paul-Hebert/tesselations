import {skeleton} from './skeleton.js';

const editor = document.querySelector('.js-editor');
const backgroundTarget = document.querySelector('.js-editor-background-target');
const svgTarget = document.querySelector('.js-editor-svg-target');

[...editor.querySelectorAll('input')].forEach(input => {
  input.addEventListener('input', e => {
    const newData = getFormObj(editor);
    // baseData is defined in the template.
    const mergedData = {...baseData, ...newData};
    const svg = skeleton(mergedData);
    const backgroundCSS = `url(data:image/svg+xml;base64,${btoa(svg)})`;

    backgroundTarget.style.backgroundImage = backgroundCSS;
    backgroundTarget.style.backgroundSize = `${mergedData.size}px`;

    svgTarget.innerHTML = svg;
  });
});

function getFormObj(form) {
  return  [...new FormData(form)].reduce((prev, [key,val]) => {
     return Object.assign(prev, {[key] : val}) ; 
   }, {}) ; 
 }