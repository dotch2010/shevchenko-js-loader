const shevchenko = require('shevchenko');
const { militaryExtension } = require('shevchenko-ext-military');

shevchenko.registerExtension(militaryExtension);

async function processNames(req, res) {
  try {
    // Отримуємо параметри запиту
    const { givenName, patronymicName, familyName } = req.query;

    if (!givenName || !patronymicName || !familyName) {
      return res.status(400).json({ error: "Missing parameters. Please provide givenName, patronymicName, and familyName." });
    }

    // Автоматично визначаємо стать
    let gender_main = await shevchenko.detectGender({
      givenName,
      patronymicName,
      familyName,
    });
    
    // Якщо стать не визначена, ставимо "masculine" за замовчуванням
    if (gender_main !== "masculine" && gender_main !== "feminine") {
      gender_main = "masculine"; // або "feminine" залежно від твоїх уподобань
    }

    // Відмінюємо ПІБ у кличному відмінку
    const inDative = await shevchenko.inDative({
      gender: gender_main,
      militaryAppointment: 'номер обслуги',
      militaryRank: 'молодший сержант',
      familyName: familyName,
      givenName: givenName,
      patronymicName: patronymicName
    });

    const inAccusative = await shevchenko.inAccusative({
      gender: gender_main,
      militaryAppointment: 'номер обслуги',
      militaryRank: 'молодший сержант',
      familyName: familyName,
      givenName: givenName,
      patronymicName: patronymicName
    });

    // Відправляємо відповідь
    res.json({ 'dative': inDative, 'accusative': inAccusative, 'gender': gender_main });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Експортуємо функцію для Vercel
module.exports = processNames;
