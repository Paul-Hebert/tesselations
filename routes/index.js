import express from 'express';
import {encode} from '../utils/tesselations/encode.js';
import {skeleton} from '../public/scripts/utils/skeleton.js';
import {css} from '../public/scripts/utils/css.js';
import {fetchOrCreateTesselations} from '../utils/tesselations/fetch-or-create-tesselations.js'

const indexRouter = express.Router();

const startCount = 27;

const tesselations = fetchOrCreateTesselations(0, startCount);

const heroData = {
  height: 102,
  width: 54,
  size: 54,
  fill: "#f4e1e5",
  stroke:"#f7eaed",
  strokeWidth:2,
  commands:"M 0 0 l 6.8122863853154465 -2.844245569232496 l 5.0411777017521535 6.3223264984073255 l 42.1465359129324 -3.4780809291748294 l 9.739296751949215 1.798276130349505 l 23.833110172173466 37.63513956745789 l 9.635306211059032 19.282693578029743 l -43.20771313518171 43.28389072416286 l -42.1465359129324 3.4780809291748294 l -5.0411777017521535 -6.3223264984073255 l -6.8122863853154465 2.844245569232496 l 43.20771313518171 -43.28389072416286 l -9.635306211059032 -19.282693578029743 l -23.833110172173466 -37.63513956745789 l -9.739296751949215 -1.798276130349505",
  version:"1.0.0"
};

const heroSvg = skeleton(heroData);

const data = {
  tesselations,
  heroCss: css({
    base64String: encode(heroSvg),
    size: heroData.size,
    fill: heroData.fill
  }),
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
