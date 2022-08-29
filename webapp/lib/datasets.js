import fs from 'fs';
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data');

export function getDatasets() {
    
    const fileNames = fs.readdirSync(dataDirectory);
    const allDatasets = fileNames.map((fileName) => {

      const id = fileName.replace(/\.json$/, '');  
      const fullPath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);
  
      // Combine the data with the id
      return {
        id,
        ...data,
      };
    });

    return allDatasets;
}