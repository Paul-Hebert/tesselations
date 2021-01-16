import {background} from '../utils/tesselations/background.js';
import express from 'express';
import {idToName} from '../utils/id-to-name.js';
import {fetchOrCreateData} from '../utils/tesselations/fetch-or-create-data.js';
import {skeleton} from '../public/scripts/skeleton.js';
const detailsRouter = express.Router();

detailsRouter.get('/:id', function(req, res, next) {
  const baseData = fetchOrCreateData(req.params.id);
  const mergedData = {...baseData, ...req.query}
  const svg = skeleton(mergedData);
  const name = idToName(req.params.id);
  const pageData = {
  }  
  
  res.render('details', { 
    title: `${name} tesselation`, 
    stylesheets: ['details'],
    id: req.params.id,
    name,
    svg,
    background: background(svg),
    data: mergedData,
    dataString: JSON.stringify(mergedData)
  });
});

export { detailsRouter };
