var randomBool = require('./random-bool');

function generateCommandsForSide(length, mainAxis, secondAxis) {
  const commands = [];
  let lengthRemaining = length;

  // Generate a random array of numbers that will add up to our total length
  while(lengthRemaining > 0) {
    if(lengthRemaining > length / 5) {
      // If we've got a ways to go choose a random number
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

  // For each of our commands along the primary axis, define how it should move
  // along the secondary axis.
  // For now all of the secondary axis movement has to add up to 0,
  // but that may change in the future.
  let secondaryAxisDrift = 0;

  commands.forEach(function(command, index, array){
    if (index === array.length - 1){ 
      command[secondAxis] = secondaryAxisDrift * -1;
    } else {
      const multiplier = randomBool() ? 1 : -1;
      const change = Math.random() * 30 * multiplier;
      secondaryAxisDrift += change;
      command[secondAxis] = change;
    }
 });

 return commands;
}

function addSide({ commands, reverse = false}) {
  const multiplier = reverse ? -1 : 1;

  if(reverse) {
    commands = commands.reverse();
  }

  return commands.map(command => {
    return `l ${command.x * multiplier} ${command.y * multiplier}`
  });
}

module.exports = function(length) {
  // Our paths are made up of a series of pen movements.
  // Right now, the pen always needs to end in a corner,
  // so, for example, all of our x movement needs to equal 100,
  // and all of our y movement needs to equal 0.
  // In the future we can explore more flexibility
  // by adding more `use` elements, and offsetting their positions.

  // Plan the movement of the pen along the top ends
  const endCommands = generateCommandsForSide(100, 'x', 'y');
  // Plan the movement of the pen along the sides
  const sideCommands = generateCommandsForSide(100, 'y', 'x');

  return [
    "M 0 0",
    ...addSide({commands: endCommands}),
    ...addSide({commands: sideCommands}),
    ...addSide({commands: endCommands, reverse: true}),
    ...addSide({commands: sideCommands, reverse:  true}),
  ].join(' ');
}