import express from 'express';
import querystring from 'querystring';
import {encode} from '../utils/tesselations/encode.js';
import {idToName} from '../utils/id-to-name.js';
import {fetchOrCreateData} from '../utils/tesselations/fetch-or-create-data.js';
import {skeleton} from '../public/scripts/utils/skeleton.js';
import {css} from '../public/scripts/utils/css.js';
const detailsRouter = express.Router();

detailsRouter.get('/:id', function(req, res, next) {
  const baseData = fetchOrCreateData(req.params.id);
  const mergedData = {...baseData, ...req.query}
  const svg = skeleton(mergedData);
  const name = idToName(req.params.id);
  
  res.render('details', { 
    title: `${name} tesselation`, 
    stylesheets: ['pages/details', 'components/code-block'],
    id: req.params.id,
    name,
    svg,
    css: css({
      base64String: encode(svg),
      size: mergedData.size,
      fill: mergedData.fill
    }),
    data: mergedData,
    dataString: JSON.stringify(mergedData),
    downloadUrl: `/download?${querystring.stringify(mergedData)}`
  });
});

export { detailsRouter };
