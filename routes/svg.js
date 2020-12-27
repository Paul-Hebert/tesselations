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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');

  const endCommands = [
    {x: 20, y: -20},
    {x: 10, y: 35},
    {x: 25, y: 35},
    {x: 45, y: -50}
  ];

  const sideCommands = [
    {x: 10, y: 30},
    {x: -10, y: 70},
  ];

  let commands = [
    "M 0 0",
    ...addSide({commands: endCommands}),
    ...addSide({commands: sideCommands}),
    ...addSide({commands: endCommands, reverse: true}),
    ...addSide({commands: sideCommands, reverse:  true}),
  ];

  const offset = {x: 0, y: 0};

  const data = {
    stroke: "#ccc",
    fill: "#c00",
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
