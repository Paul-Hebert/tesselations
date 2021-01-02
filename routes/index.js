const express = require('express');
const router = express.Router();
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');
const idToName = require('../utils/id-to-name.js');
const background = require('../utils/tesselations/background');
const fetchOrCreateData = require('../utils/tesselations/fetch-or-create-data');
const skeleton = require('../utils/tesselations/skeleton');

const tesselations = [];

// Create random IDs for tesselations.
for(var i = 0; i < 9; i++) {
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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tesselation', tesselations });
});

module.exports = router;
