import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {skeleton} from '../../public/scripts/utils/skeleton.js';
import {encode} from './encode.js';
import { css } from '../../public/scripts/utils/css.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getSavedAsCss(id) {
  const filePath = path.join(__dirname, `../../saved/${id}.json`);

  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath));
  const svg = skeleton(data);

  return css({
    base64String: encode(svg),
    size: data.size,
    fill: data.fill
  });
}