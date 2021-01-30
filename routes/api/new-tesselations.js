import express from 'express';
import {newTesselations} from '../../utils/tesselations/new-tesselations.js'

const newTesselationsRouter = express.Router();

newTesselationsRouter.get('/', function(req, res, next) {
  res.json(newTesselations(27));   
});

export { newTesselationsRouter };
