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
    {x: 10, y: 30},
    {x: 25, y: 5},
    {x: 45, y: -50}
  ];

  const sideCommands = [
    {x: 10, y: 100},
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
    fill: "#3ff",
    commands: commands.join(' '),
    usePositions: [
      {x: 100, y: offset.y, fill: '#f00'},
      {x: -100, y: offset.y, fill: '#0f0'},
      {x: offset.x, y: 100, fill: '#00f'},
      {x: offset.x, y: -100, fill: '#ccc'}
    ]
  }

  res.render('svg', { ...data, layout: false });
});

module.exports = router;
