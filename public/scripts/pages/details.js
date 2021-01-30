import {editor} from '../utils/editor.js';
import {copyCode} from '../utils/copy-code.js';

editor({
  editor: document.querySelector('.js-editor'),
  backgroundTarget: document.querySelector('.js-editor-background-target'),
  svgTarget: document.querySelector('.js-editor-svg-target'),
  svgCodeTarget: document.querySelector('.js-editor-svg-code-target'),
  cssCodeTarget: document.querySelector('.js-editor-css-code-target'),
  downloadLink: document.querySelector('.js-editor-download-link'),
})

const copyButton = document.querySelector('.js-copy-button');
const cssSourceEl = document.querySelector('.js-css-source');

copyButton.addEventListener('click', () => { copyCode(cssSourceEl) });