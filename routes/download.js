import express from 'express';
import {skeleton} from '../public/scripts/skeleton.js';
const downloadRouter = express.Router();

downloadRouter.get('/', function(req, res, next) {  
  res.setHeader('Content-Type', 'image/svg+xml'); 
  res.send(skeleton(req.query));
});

export { downloadRouter };
