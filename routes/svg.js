var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  let points = [
    [0,0],
    [100,0],
    [100,100],
    [0,100]
  ]

  points = points.map(coordinates => coordinates.join(','));

  const data = {
    stroke: "#ccc",
    fill: "#ff3",
    points: points.join(' ')
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
