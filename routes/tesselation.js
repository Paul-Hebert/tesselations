const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const generateTesselation = require('../utils/generate-tesselation');

router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  const filePath = path.join(__dirname, `../public/svgs/${id}.svg`);

  if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateTesselation(), (err) => {
      if (err) throw err;
    });
  }
  
  console.log(fs.readFileSync(path.join(__dirname, `../public/svgs/${id}.svg`), 'utf8'));

  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(filePath);
});

module.exports = router;
