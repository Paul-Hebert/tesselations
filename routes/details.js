const express = require('express');
const router = express.Router();
const idToName = require('../utils/id-to-name.js');
const background = require('../utils/tesselations/background');
const fetchOrCreateData = require('../utils/tesselations/fetch-or-create-data');
const skeleton = require('../utils/tesselations/skeleton');

router.get('/:id', function(req, res, next) {
  const baseData = fetchOrCreateData(req.params.id);
  const svg = skeleton({...baseData, ...req.query});
  const pageData = {
    id: req.params.id,
    name: idToName(req.params.id),
    svg,
    background: background(svg)
  }  
  
  res.render('details', { title: 'Tesselation', ...pageData });
});

module.exports = router;
