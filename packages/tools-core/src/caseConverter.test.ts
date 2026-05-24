import { describe, it, expect } from "vitest";
import {
  toSnakeCase,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toConstantCase,
} from "./caseConverter";

describe("caseConverter utilities", () => {
  it("converts to snake_case", () => {
    expect(toSnakeCase("camelCase")).toBe("camel_case");
    expect(toSnakeCase("kebab-case")).toBe("kebab_case");
    expect(toSnakeCase("PascalCase")).toBe("pascal_case");
    expect(toSnakeCase("Hello World")).toBe("hello_world");
    expect(toSnakeCase("already_snake_case")).toBe("already_snake_case");
  });

  it("converts to camelCase", () => {
    expect(toCamelCase("snake_case")).toBe("snakeCase");
    expect(toCamelCase("kebab-case")).toBe("kebabCase");
    expect(toCamelCase("PascalCase")).toBe("pascalCase");
    expect(toCamelCase("Hello World")).toBe("helloWorld");
    expect(toCamelCase("alreadyCamelCase")).toBe("alreadyCamelCase");
  });

  it("converts to kebab-case", () => {
    expect(toKebabCase("camelCase")).toBe("camel-case");
    expect(toKebabCase("snake_case")).toBe("snake-case");
    expect(toKebabCase("PascalCase")).toBe("pascal-case");
    expect(toKebabCase("Hello World")).toBe("hello-world");
    expect(toKebabCase("already-kebab-case")).toBe("already-kebab-case");
  });

  it("converts to PascalCase", () => {
    expect(toPascalCase("camelCase")).toBe("CamelCase");
    expect(toPascalCase("snake_case")).toBe("SnakeCase");
    expect(toPascalCase("kebab-case")).toBe("KebabCase");
    expect(toPascalCase("Hello World")).toBe("HelloWorld");
  });

  it("converts to CONSTANT_CASE", () => {
    expect(toConstantCase("camelCase")).toBe("CAMEL_CASE");
    expect(toConstantCase("Hello World")).toBe("HELLO_WORLD");
  });
});
