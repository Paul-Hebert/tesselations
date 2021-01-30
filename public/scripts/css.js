import {urlString} from './url-string.js';

export function css({base64String, size, fill}) {
  return `
    background-color: ${fill};
    background-image: ${urlString(base64String)};
    background-size: ${size}px;
  `;
}