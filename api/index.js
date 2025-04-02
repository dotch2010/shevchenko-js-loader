const shevchenko = require('shevchenko');

async function main() {
  const input = {
    givenName: 'Тарас',
    patronymicName: 'Григорович',
    familyName: 'Шевченко'
  };

  const output = await shevchenko.inVocative(input);

  console.log(output);
}

main().catch((error) => console.error(error));
