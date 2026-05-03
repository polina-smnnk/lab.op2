const fs = require('fs');

async function* splitToLines(stream) {
  let buffer = '';

  for await (const chunk of stream) {
    buffer += chunk;
    let parts = buffer.split('\n');

    buffer = parts.pop();

    for (let line of parts) {
      yield line;
    }
  }

  if (buffer) {
    yield buffer;
  }
}

async function analyze(filePath) {
  const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  let lines = 0;
  let words = 0;
  let longLines = 0;

  for await (let line of splitToLines(stream)) {
    lines++;

    if (line.length > 25) {
      longLines++;
    }

    const arr = line.trim().split(/\s+/);
    words += arr.filter(Boolean).length;
  }

  console.log('Lines:', lines);
  console.log('Words:', words);
  console.log('Long lines:', longLines);
}

analyze(__dirname + '/data.txt').catch(console.error);