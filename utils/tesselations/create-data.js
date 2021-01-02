const commands = require('./commands');
const randomBool = require('../random-bool');
const hslToHex = require('../hsl-to-hex');



function plusOrMinus(base, change) {
  return base + (randomBool ? 1 : -1) * change;
}

module.exports = function() {
  const fill = {
    h: Math.random() * 360,
    s: plusOrMinus(50, Math.random() * 50),
    l: plusOrMinus(50, Math.random() * 50),
  }
  
  // Either use the same hue or a complementary hue for the stroke.
  let strokeHue = randomBool() ? fill.h : fill.h + 180;
  if(strokeHue > 360) strokeHue -= 360;
  
  const stroke = {
    h: strokeHue,
    s: 20 + Math.random() * 80,
    l: 30 + Math.random() * 70,
  }
  
  const height = Math.round(30 + Math.random() * 130);
  const width = Math.round(30 + Math.random() * 130);
  
  return {
    height,
    width,
    size: width,
    fill: hslToHex(fill),
    stroke: hslToHex(stroke),
    strokeWidth: Math.round(1 + Math.random() * Math.min(height, width) * 1/2),
    commands: commands(width, height),
    version: '1.0.0'
  }

  return data;
}