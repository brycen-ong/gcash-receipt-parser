const fs = require('fs');

const readPath = 'data.txt';
const writePath = 'output.txt';

fs.readFile(readPath, 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading file: ', err);
    return;
  }

  const textLines = data.trim().split('\n');
  let runningBalance = 4963.78;
  const parsedLines = [];

  textLines.forEach((line) => {
    const strings = line.split(' ');
    const date = `${strings[0]} ${strings[1]} ${strings[2]}`;
    const referenceNo = strings[strings.length - 3];
    const descriptionArr = [];
    let description = '';
    let credit = '';
    let debit = '';
    const change = strings[strings.length - 2];
    let balance = strings[strings.length - 1];
    if (+balance > +runningBalance) {
      credit = change;
      debit = '0';
      runningBalance = balance;
    } else if (balance === '0.00') {
      credit = change;
      debit = '0';
      runningBalance = +runningBalance + +change;
      balance = runningBalance;
    } else {
      credit = '0';
      debit = change;
      runningBalance = balance;
    }

    for (let i = 3; i < strings.length - 3; i++) {
      descriptionArr.push(strings[i].replace(',',''));
    }

    description = descriptionArr.join(' ');

    parsedLines.push(`${date},${description},${referenceNo},${debit},${credit},${balance}`);
  });

  const output = parsedLines.join('\n');

  fs.writeFile(writePath, output, (err) => {
    if (err) {
      console.log('Error writing file: ', err);
      return;
    }

    console.log('Data written to file successfully');
  })
})