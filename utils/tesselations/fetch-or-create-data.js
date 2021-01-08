import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {createData} from './create-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function fetchOrCreateData(id) {
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