import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import {idToName} from '../id-to-name.js';
import {encode} from './encode.js';
import {fetchOrCreateData} from './fetch-or-create-data.js';
import {skeleton} from '../../public/scripts/utils/skeleton.js';
import {css} from '../../public/scripts/utils/css.js';

export function newTesselations(count) {
  const tesselations = []

  for(var i = 0; i < 27; i++) {
    const id = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: '-'
    });
  
    const tessData = fetchOrCreateData(id);
    const svg = skeleton(tessData)
  
    tesselations.push({
      id,
      name: idToName(id),
      css: css({
        base64String: encode(svg),
        size: tessData.size,
        fill: tessData.fill
      })
    });
  }

  return tesselations;
}