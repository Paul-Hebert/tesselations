const commands = require('./commands');
const randomBool = require('../random-bool');

function hsla({hue, saturation, lightness}) {
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
}

function plusOrMinus(base, change) {
  return base + (randomBool ? 1 : -1) * change;
}

module.exports = function() {

  const fill = {
    hue: Math.random() * 360,
    saturation: plusOrMinus(50, Math.random() * 50),
    lightness: plusOrMinus(50, Math.random() * 50),
  }
  
  // Either use the same hue or a complementary hue for the stroke.
  let strokeHue = randomBool() ? fill.hue : fill.hue + 180;
  if(strokeHue > 360) strokeHue -= 360;
  
  const stroke = {
    hue: strokeHue,
    saturation: 20 + Math.random() * 80,
    lightness: 30 + Math.random() * 70,
  }
  
  const height = 30 + Math.random() * 130;
  const width = 30 + Math.random() * 130;
  
  return {
    height,
    width,
    fill: hsla(fill),
    stroke: hsla(stroke),
    strokeWidth: 1 + Math.random() * Math.min(height, width) * 1/2,
    commands: commands(width, height)
  }

  return data;
}