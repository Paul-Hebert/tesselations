var express = require('express');
var router = express.Router();

function addSide({ commands, reverse = false}) {
  const multiplier = reverse ? -1 : 1;

  if(reverse) {
    commands = commands.reverse();
  }

  return commands.map(command => {
    return `l ${command.x * multiplier} ${command.y * multiplier}`
  });
}

function randomHsl() {
  return 'hsla(' + (Math.random() * 360) + ', 70%, 30%, 1)';
}

function randomBool() {
  return Math.random() > 0.5;
}

function randomCommands(length, mainAxis, secondAxis) {
  const commands = [];
  let lengthRemaining = length;

  // Generate a random array of numbers that will add up to our total length
  while(lengthRemaining > 0) {
    if(lengthRemaining > length / 10) {
      // If we've got a ways to go choose a random numbn
      newLength = Math.random() * lengthRemaining;
    } else {
      // If we're close to our length, just use the remaining length
      newLength = lengthRemaining
    }

    lengthRemaining -= newLength;
    // Create a new command with instructions for our main axis.
    newCommand = {};
    newCommand[mainAxis] = newLength;

    commands.push(newCommand);
  }

  // Randomize the order of our commands
  commands.sort((a, b) => randomBool() ? 1 : -1);

  const secondaryAxisDrift = 0;

  commands.forEach(function(command, index, array){
    if (index === array.length - 1){ 
      command[secondAxis] = secondaryAxisDrift * -1;
    } else {
      const multiplier = randomBool() ? 1 : -1;
      command[secondAxis] = Math.random() * 30 * multiplier;
    }
 });

 return commands;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  // Our paths are made up of a series of pen movements.
  // Right now, the pen always needs to end in a corner,
  // so, for example, all of our x movement needs to equal 100,
  // and all of our y movement needs to equal 0.
  // In the future we can explore more flexibility
  // by adding more `use` elements, and offsetting their positions.

  // Plan the movement of the pen along the top ends
  const endCommands = randomCommands(100, 'x', 'y');
  // Plan the movement of the pen along the sides
  const sideCommands = randomCommands(100, 'y', 'x');

  let commands = [
    "M 0 0",
    ...addSide({commands: endCommands}),
    ...addSide({commands: sideCommands}),
    ...addSide({commands: endCommands, reverse: true}),
    ...addSide({commands: sideCommands, reverse:  true}),
  ];

  const offset = {x: 0, y: 0};

  const data = {
    stroke: 'rgba(255, 255, 255, 1)',
    strokeWidth: Math.random() * 8,
    fill: randomHsl(),
    commands: commands.join(' '),
    usePositions: [
      {x: 100, y: offset.y},
      {x: -100, y: offset.y},
      {x: offset.x, y: 100},
      {x: offset.x, y: -100}
    ]
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
