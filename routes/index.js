const express = require('express');
const router = express.Router();
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');
const idToName = require('../utils/id-to-name.js');
const background = require('../utils/tesselations/background');
const fetchOrCreateData = require('../utils/tesselations/fetch-or-create-data');
const skeleton = require('../utils/tesselations/skeleton');

const tesselations = [];

for(var i = 0; i < 27; i++) {
  const id = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-'
  });

  tesselations.push({
    id,
    name: idToName(id),
    background: background(skeleton(fetchOrCreateData(id)))
  });
}

const data = {
  tesselations,
  heroBackground: background(skeleton({
    height: 102,
    width: 54,
    size: 54,
    fill: "#f4e1e5",
    stroke:"#f7eaed",
    strokeWidth:2,
    commands:"M 0 0 l 6.8122863853154465 -2.844245569232496 l 5.0411777017521535 6.3223264984073255 l 42.1465359129324 -3.4780809291748294 l 9.739296751949215 1.798276130349505 l 23.833110172173466 37.63513956745789 l 9.635306211059032 19.282693578029743 l -43.20771313518171 43.28389072416286 l -42.1465359129324 3.4780809291748294 l -5.0411777017521535 -6.3223264984073255 l -6.8122863853154465 2.844245569232496 l 43.20771313518171 -43.28389072416286 l -9.635306211059032 -19.282693578029743 l -23.833110172173466 -37.63513956745789 l -9.739296751949215 -1.798276130349505",
    version:"1.0.0"
  }))
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tesselation', data });
});

module.exports = router;
