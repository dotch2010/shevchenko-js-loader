const shevchenko = require('shevchenko');

const gender_main = await shevchenko.detectGender({
  givenName: 'Тарас',
  patronymicName: 'Григорович',
  familyName: 'Шевченко',
});

const anthroponym = await shevchenko.inVocative({
  gender: gender_main,
  givenName: 'Тарас',
  patronymicName: 'Григорович',
  familyName: 'Шевченко',
});

/*
async function main() {
  const input = {
    gender: 'masculine',
    givenName: 'Роман',
    patronymicName: 'Андрій',
    familyName: 'Михайлович'
  };

  const output = await shevchenko.inVocative(input);

  console.log(output); // { givenName: "Тарасе", patronymicName: "Григоровичу", familyName: "Шевченку" }
}

main().catch((error) => console.error(error));
*/
