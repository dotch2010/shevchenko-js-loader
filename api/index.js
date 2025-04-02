const shevchenko = require('shevchenko');

async function processNames() {
  try {
    // Використовуємо await в асинхронній функції
    const gender_main = await shevchenko.detectGender({
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    });

    // Використовуємо gender_main для відмінювання
    const anthroponym = await shevchenko.inVocative({
      gender: gender_main,
      givenName: 'Тарас',
      patronymicName: 'Григорович',
      familyName: 'Шевченко',
    });

    // Логування результатів для перевірки
    console.log('Detected Gender:', gender_main);
    console.log('Anthroponym in Vocative Case:', anthroponym);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Викликаємо функцію для виконання асинхронних операцій
processNames();

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
