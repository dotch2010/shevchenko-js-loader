const shevchenko = require('shevchenko');

async function main() {
  const anthroponym = {
    givenName: 'Сай',
    patronymicName: 'Вікторія',
    familyName: 'Євгенівна'
  };

  const gender = await shevchenko.detectGender(anthroponym); // "feminine"
  if (gender == null) {
    throw new Error('Failed to detect grammatical gender.');
  }

  const input = { ...anthroponym, gender };

  const output = await shevchenko.inVocative(input);

  console.log(output); // { givenName: "Ларисо", patronymicName: "Петрівно", familyName: "Косач-Квітко" }
}

main().catch((error) => console.error(error));
