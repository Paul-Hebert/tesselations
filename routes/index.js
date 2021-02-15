import express from 'express';
import {fetchOrCreateTesselations} from '../utils/tesselations/fetch-or-create-tesselations.js'
import {getSavedAsCss} from '../utils/tesselations/get-saved-as-css.js'

const indexRouter = express.Router();

const startCount = 27;

const tesselations = fetchOrCreateTesselations(0, startCount);

const data = {
  tesselations,
  heroCss: getSavedAsCss('hero'),
  startCount
}

indexRouter.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Tesselations', 
    stylesheets: [
      'components/hero',
      'components/listings',
      'components/card'
    ],
    data 
  });
});

export { indexRouter };
