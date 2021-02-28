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
  let secondAxisDrift = 0;

  commands.forEach(function(command, index, array){
    // Decide whether to do a straight line or a curve
    // TODO: in the future write more thoughful logic for this
    command.type = randomBool() ? "L" : "Q";

    // First we firgure out our endpoint
    if (index === array.length - 1){ 
      // If this is our last command make sure we come back to the corner
      command[secondAxis] = secondAxisDrift * -1;
    } else {
      // Otherwise we can create a random amount of change within our bounds
      const multiplier = randomBool() ? 1 : -1;
      const change = Math.round(Math.random() * variance/4 * multiplier);
      // Ensure we don't go too far in one direction.
      if(change + secondAxisDrift > variance) { variance * -1; }
      secondAxisDrift += change;
      command[secondAxis] = change;
    }

    // If this is a quadratic curve, figure out the relative position of our
    // control point.
    if(command.type === "Q") {
      command.control = {};
      command.control[mainAxis] = Math.round(command[mainAxis] * Math.random());
      command.control[secondAxis] = Math.round(command[secondAxis] + command[secondAxis] * Math.random());
    }
 });

 return commands;
}

function addSide({ commands, position, mainAxis, secondAxis, reverse = false}) {
  const multiplier = reverse ? -1 : 1;
  let startPoint = position;
  let endPoint = {};
  let controlPoint = {};
  if(reverse) {
    commands = commands.reverse();
  }

  return commands.map(command => {
    endPoint.x = startPoint.x + command.x * multiplier;
    endPoint.y = startPoint.y + command.y * multiplier;

    if(command.type === "Q") {
      controlPoint[mainAxis] = startPoint[mainAxis] + command.control[mainAxis];
      controlPoint[secondAxis] =  startPoint[secondAxis] + command.control[secondAxis];
    }

    startPoint = endPoint;
    if(command.type === "Q") {
      return `${command.type}${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y}`;
    } else {
      return `${command.type}${endPoint.x},${endPoint.y}`;
    }
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
    "M 0,0",
    ...addSide({commands: endCommands, position: {x: 0, y: 0}, mainAxis: 'x', secondAxis: 'y'}),
    ...addSide({commands: sideCommands, position: {x: width, y: 0}, mainAxis: 'y', secondAxis: 'x'}),
    ...addSide({commands: endCommands, position: {x: width, y: height}, reverse: true, mainAxis: 'x', secondAxis: 'y'}),
    ...addSide({commands: sideCommands, position: {x: 0, y: height}, reverse:  true, mainAxis: 'y', secondAxis: 'x'}),
    "Z"
  ].join(' ');
}