const fs = require('fs');
const path = require('path');
const createData = require('./create-data');

module.exports = function(id) {
  const directoryPath = path.join(__dirname, `../../tesselations/${id}`);
  const filePath = `${directoryPath}/index.json`
  let data;

  if(fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath));
  }

  data = createData();
  
  fs.mkdirSync(directoryPath);
  fs.writeFileSync(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
  });

  return data;
}