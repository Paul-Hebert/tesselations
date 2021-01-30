import {skeleton} from './skeleton.js';
import {css} from './css.js';
import {urlString} from './url-string.js';

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
    const base64String = btoa(svg);
    const backgroundCSS = css({
      base64String: base64String,
      size: mergedData.size,
      fill: mergedData.fill
    });
    const downloadUrl = `/download?${new URLSearchParams(mergedData).toString()}`;

    const query = new URLSearchParams(newData).toString();
    history.replaceState({}, '', `${window.location.pathname}?${query}`);

    window.requestAnimationFrame(() => {
      if(backgroundTarget) {
        backgroundTarget.style.backgroundColor = mergedData.fill;
        backgroundTarget.style.backgroundImage = urlString(base64String);
        backgroundTarget.style.backgroundSize = `${mergedData.size}px`;
      }
      
      if (cssCodeTarget) cssCodeTarget.innerText = backgroundCSS;
  
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