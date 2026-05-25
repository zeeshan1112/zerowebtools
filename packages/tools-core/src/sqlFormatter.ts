/**
 * Standard rules-based SQL Formatter and Beautifier.
 * Capitalizes keywords and formats clauses onto new indented lines.
 */

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER",
  "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT", "INTO", "VALUES",
  "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "DROP", "ALTER", "ADD",
  "INDEX", "ON", "AS", "AND", "OR", "IN", "USING", "ON", "UNION", "ALL",
  "CROSS", "NATURAL", "CASE", "WHEN", "THEN", "ELSE", "END"
];

export function formatSql(sql: string): string {
  if (!sql.trim()) return "";

  // 1. Tokenize & Clean up spacing
  let cleaned = sql
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s*=\s*/g, " = ")
    .replace(/\s*!=\s*/g, " != ")
    .replace(/\s*<\s*/g, " < ")
    .replace(/\s*>\s*/g, " > ")
    .replace(/\s*\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ") ")
    .replace(/\s+/g, " ")
    .trim();

  // 2. Capitalize Keywords
  SQL_KEYWORDS.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    cleaned = cleaned.replace(regex, keyword);
  });

  // 3. Apply indentations on major clauses
  const majorClauses = [
    "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN",
    "INNER JOIN", "OUTER JOIN", "GROUP BY", "ORDER BY", "HAVING",
    "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"
  ];

  let indented = cleaned;
  majorClauses.forEach((clause) => {
    // Add line break before major clauses (unless it's the very start)
    const regex = new RegExp(`(?<!^)\\b${clause}\\b`, "g");
    indented = indented.replace(regex, `\n${clause}`);
  });

  // 4. Clean up lines and spacing inside select lists / where clauses
  const lines = indented.split("\n");
  const formattedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";

    // Indent sub-statements slightly
    const startsWithKeyword = majorClauses.some((c) => trimmed.startsWith(c));
    const indent = startsWithKeyword ? "" : "  ";

    return indent + trimmed;
  });

  return formattedLines.filter(Boolean).join("\n");
}
