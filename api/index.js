const shevchenko = require('shevchenko');

async function processNames(req, res) {
  try {
    // Перевірка параметрів запиту
    const { givenName, patronymicName, familyName } = req.query;

    if (!givenName || !patronymicName || !familyName) {
      return res.status(400).json({ error: "Missing parameters. Please provide givenName, patronymicName, and familyName." });
    }

    // Використовуємо await в асинхронній функції
    const gender_main = await shevchenko.detectGender({
      givenName,
      patronymicName,
      familyName,
    });

    // Використовуємо gender_main для відмінювання
    const anthroponym = await shevchenko.inVocative({
      gender: gender_main,
      givenName,
      patronymicName,
      familyName,
    });

    // Відправка результату
    res.json({ anthroponym });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Експортуємо функцію обробника
module.exports = processNames;
