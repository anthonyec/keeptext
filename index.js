const { stdout } = require('process');
const fs = require('fs');
const path = require('path');

const SOURCE = process.argv[2];
const DESTINATION = process.argv[3];

function isFileJson(file) {
  return path.extname(file) === '.json';
}

function parseTextContent(textContent) {
  return textContent;
}

function parseListContent(listContent) {
  return listContent
    .map((item) => {
      const checkbox = item.isChecked ? '- [x]' : '- [ ]';
      return `${checkbox} ${item.text}`;
    })
    .join('\n');
}

async function main() {
  if (!process.argv[2] || !process.argv[3]) {
    stdout.write(`Usage: keeptext <source> <destination> \n`);

    stdout.write(`\nArguments:\n`);
    stdout.write(
      `<source>           Directory containing keep exported files\n`
    );
    stdout.write(
      `<destination>      Where to place the generated text files\n`
    );
    return;
  }

  const exportedFiles = fs.readdirSync(SOURCE);
  const jsonFiles = exportedFiles.filter(isFileJson);

  for (let index in jsonFiles) {
    const fileNameWithExt = jsonFiles[index];
    const fileName = path.basename(
      fileNameWithExt,
      path.extname(fileNameWithExt)
    );
    const filePath = path.join(SOURCE, fileNameWithExt);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    try {
      const json = JSON.parse(fileContents);

      let textFile = '';

      if (json.textContent) {
        textFile += parseTextContent(json.textContent);
      }

      if (json.listContent) {
        textFile += parseListContent(json.listContent);
      }

      const timestampInMilliseconds = json.userEditedTimestampUsec / 1000;
      const date = new Date(timestampInMilliseconds);
      const iso = date.toISOString();
      const isoWithoutTime = iso.split('T')[0];
      const newFileNameWithExt = `${isoWithoutTime} - ${fileName}.txt`;

      fs.writeFileSync(
        path.join(DESTINATION, newFileNameWithExt),
        textFile,
        'utf8'
      );
    } catch (err) {
      throw new Error(
        `The file '${fileNameWithExt}' could not be parsed as JSON`
      );
    }
  }
}

main();
