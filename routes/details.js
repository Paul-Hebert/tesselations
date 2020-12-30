const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  const data = {
    id: req.params.id,
  }  
  
  res.render('details', { title: 'Tesselation', ...data });
});

module.exports = router;
