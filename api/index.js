const { inflect } = require("shevchenko");

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
    // Виконання відмінювання
    const result = inflect(name, caseName);

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
