export function toSnakeCase(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
}

export function toCamelCase(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/(?:^\w|[A-Z]|[\s-_]\w)/g, (match, index: number) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/[\s-_]+/g, "");
}

export function toKebabCase(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function toPascalCase(input: string): string {
  if (typeof input !== "string") return "";
  const camel = toCamelCase(input);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export function toConstantCase(input: string): string {
  return toSnakeCase(input).toUpperCase();
}