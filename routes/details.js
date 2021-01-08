import {background} from '../public/scripts/background.js';
import express from 'express';
import {idToName} from '../utils/id-to-name.js';
import {fetchOrCreateData} from '../utils/tesselations/fetch-or-create-data.js';
import {skeleton} from '../public/scripts/skeleton.js';
const detailsRouter = express.Router();

detailsRouter.get('/:id', function(req, res, next) {
  const baseData = fetchOrCreateData(req.params.id);
  const mergedData = {...baseData, ...req.query}
  const svg = skeleton(mergedData);
  const pageData = {
    id: req.params.id,
    name: idToName(req.params.id),
    svg,
    background: background(svg),
    data: mergedData
  }  
  
  res.render('details', { title: 'Tesselation', ...pageData });
});

export { detailsRouter };
