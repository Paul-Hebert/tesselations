var express = require('express');
var router = express.Router();

const names = [];

// Create random IDs for tesselations.
for(var i = 0; i < 90; i++) {
  names.push(Math.random());
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tesselation', names });
});

module.exports = router;
