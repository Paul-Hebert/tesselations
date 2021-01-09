import {commands} from './commands.js';
import {randomBool} from '../random-bool.js';
import {hslToHex} from '../hsl-to-hex.js';

function plusOrMinus(base, change) {
  return base + (randomBool ? 1 : -1) * change;
}

function dimensionLength() {
  return Math.round(10 + Math.random() * 130);
}

export function createData() {
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
  
  const height = dimensionLength();
  const width = dimensionLength();
  
  return {
    height,
    width,
    size: Math.round(Math.random() * 100),
    fill: hslToHex(fill),
    stroke: hslToHex(stroke),
    strokeWidth: Math.round(1 + Math.random() * Math.min(height, width) * 1/2),
    commands: commands(width, height),
    version: '1.0.0'
  }

  return data;
}