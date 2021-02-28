import {randomBool} from '../random-bool.js';

function generateCommandsForSide(length, variance, mainAxis, secondAxis) {
  const commands = [];
  let lengthRemaining = length;
  let newLength, newCommand;

  // Generate a random array of numbers that will add up to our total length
  while(lengthRemaining > 0) {
    if(lengthRemaining > length / 5) {
      // If we've got a ways to go choose a random number
      newLength = Math.round(Math.random() * lengthRemaining);
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
      const change = Math.round(Math.random() * variance/4 * multiplier);
      if(change + secondaryAxisDrift > variance) { variance * -1; }
      secondaryAxisDrift += change;
      command[secondAxis] = change;
    }
 });

 return commands;
}

function addSide({ commands, position, reverse = false}) {
  const multiplier = reverse ? -1 : 1;
  const currentPosition = position;
  if(reverse) {
    commands = commands.reverse();
  }

  return commands.map(command => {
    currentPosition.x += command.x * multiplier;
    currentPosition.y += command.y * multiplier;

    return `L ${currentPosition.x} ${currentPosition.y}`;
  });
}

export function commands(width, height) {
  // Our paths are made up of a series of pen movements. The pen always needs 
  // to end in a corner, so, for example, when creating a horizontal line, 
  // all of our x movement needs to equal our width, and all of our y movement
  // needs to equal 0.

  // Plan the movement of the pen along the top ends
  const endCommands = generateCommandsForSide(width, height, 'x', 'y');
  // Plan the movement of the pen along the sides
  const sideCommands = generateCommandsForSide(height, width, 'y', 'x');

  return [
    "M 0 0",
    ...addSide({commands: endCommands, position: {x: 0, y: 0}}),
    ...addSide({commands: sideCommands, position: {x: width, y: 0}}),
    ...addSide({commands: endCommands, position: {x: width, y: height}, reverse: true}),
    ...addSide({commands: sideCommands, position: {x: 0, y: height}, reverse:  true}),
    "Z"
  ].join(' ');
}