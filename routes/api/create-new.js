import express from 'express';
import {newTesselations} from '../../utils/tesselations/create-new.js'

const createNewRouter = express.Router();

createNewRouter.get('/', function(req, res, next) {
  res.json(newTesselations(27));   
});

export { createNewRouter };
