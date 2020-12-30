const express = require('express');
const router = express.Router();
const idToName = require('../utils/id-to-name.js');

router.get('/:id', function(req, res, next) {
  const data = {
    id: req.params.id,
    name: idToName(req.params.id)
  }  
  
  res.render('details', { title: 'Tesselation', ...data });
});

module.exports = router;
