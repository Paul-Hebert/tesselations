var generateCommands = require('../utils/generate-commands');
var express = require('express');
var router = express.Router();

function randomHsl() {
  return 'hsla(' + (Math.random() * 360) + ', 70%, 30%, 1)';
}

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  const data = {
    stroke: 'rgba(255, 255, 255, 1)',
    strokeWidth: 1 + Math.random() * 30,
    fill: randomHsl(),
    commands: generateCommands(100),
    usePositions: [
      {x: 100, y: 0},
      {x: -100, y: 0},
      {x: 0, y: 100},
      {x: 0, y: -100}
    ]
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
