const fs = require('fs');

async function readChunks(filePath) {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  for await (const chunk of stream) {
    console.log(chunk);
  }
}

readChunks(__dirname + '/data.txt');