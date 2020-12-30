// In the future we may want to hook into Express's default view engine
// instead of using our own copy of Handlebars
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const generateCommands = require('../utils/generate-commands');
const randomBool = require('../utils/random-bool');

function hsla({hue, saturation, lightness}) {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
}

function plusOrMinus(base, change) {
  return base + (randomBool ? 1 : -1) * change;
}

module.exports = function() {
  const fill = {
    hue: Math.random() * 360,
    saturation: Math.random() * 25 + 25,
    lightness: Math.random() * 25 + 25,
  }
  
  // Either use the same hue or a complementary hue for the stroke.
  let strokeHue = randomBool() ? fill.hue : fill.hue + 180;
  if(strokeHue > 360) strokeHue -= 360;
  
  const stroke = {
    hue: strokeHue,
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
  
  const source = fs.readFileSync(path.join(__dirname, '../views/tesselation.hbs'), 'utf8');
  const template = Handlebars.compile(source);
  return template(data);
}