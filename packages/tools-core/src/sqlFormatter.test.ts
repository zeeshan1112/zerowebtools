import { describe, test, expect } from "vitest";
import { formatSql } from "./sqlFormatter";

describe("sqlFormatter tests", () => {
  test("capitalizes keywords and formats clauses", () => {
    const rawSql = "select id, name from users where id = 10 group by name";
    const formatted = formatSql(rawSql);
    expect(formatted).toBe(
      "SELECT id, name\nFROM users\nWHERE id = 10\nGROUP BY name"
    );
  });

  test("indents fields correctly", () => {
    const rawSql = "insert into logs (level, message) values ('info', 'test')";
    const formatted = formatSql(rawSql);
    expect(formatted).toBe(
      "INSERT INTO logs (level, message)\nVALUES ('info', 'test')"
    );
  });
});
