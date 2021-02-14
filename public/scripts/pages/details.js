import {editor} from '../utils/editor.js';
import {copyCode} from '../utils/copy-code.js';
import {toast} from '../utils/toast.js';

editor({
  editor: document.querySelector('.js-editor'),
  backgroundTarget: document.querySelector('.js-editor-background-target'),
  svgTarget: document.querySelector('.js-editor-svg-target'),
  svgCodeTarget: document.querySelector('.js-editor-svg-code-target'),
  cssCodeTarget: document.querySelector('.js-editor-css-code-target'),
  downloadLink: document.querySelector('.js-editor-download-link'),
})

const cssCopyButton = document.querySelector('.js-css-copy-button');
const svgCopyButton = document.querySelector('.js-svg-copy-button');
const cssSourceEl = document.querySelector('.js-css-source');
const svgSourceEl = document.querySelector('.js-svg-source');

const toastInstance = toast(document.querySelector('.js-toast'));

cssCopyButton.addEventListener('click', () => { 
  copyCode(cssSourceEl.innerText).then(() => {
    toastInstance.show('CSS code copied to clipboard.');
  });
});

svgCopyButton.addEventListener('click', () => { 
  copyCode(svgSourceEl.innerText).then(() => {
    toastInstance.show('SVG code copied to clipboard.');
  });
});