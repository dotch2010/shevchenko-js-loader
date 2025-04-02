const shevchenko = require('shevchenko');

async function main() {
  const input = {
    gender: 'masculine',
    givenName: 'Тарас',
    patronymicName: 'Григорович',
    familyName: 'Шевченко'
  };

  const output = await shevchenko.inVocative(input);

  console.log(output); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
}

main().catch((error) => console.error(error));
