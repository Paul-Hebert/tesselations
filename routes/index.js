const express = require('express');
const router = express.Router();
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');
const idToName = require('../utils/id-to-name.js');

const tesselations = [];

// Create random IDs for tesselations.
for(var i = 0; i < 90; i++) {
  const id = uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '-'
  });
  tesselations.push({
    id,
    name: idToName(id)
  });
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tesselation', tesselations });
});

module.exports = router;
