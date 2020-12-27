var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  let points = [
    "M 0 0",
    "l 100 100",
    "l -100 0",
    "l -100 -100"
  ]

  const data = {
    stroke: "#ccc",
    fill: "#ff3",
    commands: points.join(' ')
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
