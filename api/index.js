export default async function handler(req, res) {
  // Перевірка на метод запиту
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, caseName } = req.query;

  // Перевірка на відсутність параметрів
  if (!name || !caseName) {
    return res.status(400).json({ error: "Both 'name' and 'caseName' are required parameters." });
  }

  try {
    // Завантаження бібліотеки Shevchenko через CDN
    const script = await fetch("https://unpkg.com/shevchenko@3.1.4/dist/cjs/shevchenko.js");
    const shevchenkoScript = await script.text();

    // Логування для перевірки завантаження скрипта
    console.log("Shevchenko script loaded successfully!");

    // Створення функції для використання бібліотеки
    eval(shevchenkoScript); // Це завантажує код бібліотеки в поточний контекст

    // Логування параметрів
    console.log(`Inflecting name: ${name}, case: ${caseName}`);

    // Виконання відмінювання
    const result = inflect(name, caseName);

    // Логування результату
    console.log("Result of inflection:", result);

    if (!result) {
      return res.status(400).json({ error: `Unable to inflect name: ${name} for case: ${caseName}` });
    }

    // Відправка результату
    return res.json({ result });
  } catch (error) {
    console.error('Error in function execution:', error);
    return res.status(500).json({ error: "Internal Server Error: Unable to process the inflection." });
  }
}
