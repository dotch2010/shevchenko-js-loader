import { inflect } from "shevchenko";

export default function handler(req, res) {
  // Перевірка методів запиту
  if (req.method !== 'GET') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Отримання параметрів
  const { name, caseName } = req.query;

  // Перевірка на наявність параметрів
  if (!name || !caseName) {
    return res.status(400).json({ error: "Missing parameters: 'name' and 'caseName' are required" });
  }

  try {
    // Виконання відмінювання
    const result = inflect(name, caseName);
    return res.json({ result });
  } catch (error) {
    // Обробка помилок
    console.error("Error during inflection:", error);
    return res.status(500).json({ error: "Internal Server Error: Failed to process inflection" });
  }
}
