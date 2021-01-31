import express from 'express';
import {fetchOrCreateTesselations} from '../../utils/tesselations/fetch-or-create-tesselations.js'

const fetchMoreRouter = express.Router();

fetchMoreRouter.get('/', function(req, res, next) {
  let {start, count} = req.query;
  if(count > 100) count = 100;
  res.json(fetchOrCreateTesselations(start, count));   
});

export { fetchMoreRouter };
