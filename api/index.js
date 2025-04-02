import { inflect } from "shevchenko";

export default function handler(req, res) {
  const { name, caseName } = req.query;

  if (!name || !caseName) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const result = inflect(name, caseName);
  return res.json({ result });
}
