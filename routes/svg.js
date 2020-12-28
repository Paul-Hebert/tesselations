var generateCommands = require('../utils/generate-commands');
var randomBool = require('../utils/random-bool');
var express = require('express');
var router = express.Router();

function hsla({hue, saturation, lightness}) {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
}

function plusOrMinus(base, change) {
  return base + (randomBool ? 1 : -1) * change;
}

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  const fill = {
    hue: Math.random() * 360,
    saturation: Math.random() * 25 + 25,
    lightness: Math.random() * 25 + 25,
  }

  const stroke = {
    hue: fill.hue,
    saturation: plusOrMinus(fill.saturation, Math.random() * 25),
    lightness: plusOrMinus(fill.lightness, Math.random() * 25),
  }

  const height = 30 + Math.random() * 130;
  const width = 30 + Math.random() * 130;

  const data = {
    height,
    width,
    fill: hsla(fill),
    stroke: hsla(stroke),
    strokeWidth: 1 + Math.random() * Math.min(height, width) * 1/2,
    commands: generateCommands(width, height),
    usePositions: [
      {x: width, y: 0},
      {x: width * -1, y: 0},
      {x: 0, y: height},
      {x: 0, y: height * -1}
    ]
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
