import {skeleton} from './skeleton.js';
import {css} from './css.js';

export function editor({editor, backgroundTarget, svgTarget, svgCodeTarget, cssCodeTarget, downloadLink }) {
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
          backgroundTarget.style.cssText = backgroundCSS;
        }
        
        if (cssCodeTarget) cssCodeTarget.innerText = backgroundCSS;
    
        if (svgTarget) svgTarget.innerHTML = svg;
        if (svgCodeTarget) svgCodeTarget.innerText = svg;

        if(downloadLink) downloadLink.href = downloadUrl;
      });
    });
  });
}

function getFormObj(form) {
  return [...new FormData(form)].reduce((prev, [key,val]) => {
    return Object.assign(prev, {[key] : val}) ; 
  }, {}) ; 
}