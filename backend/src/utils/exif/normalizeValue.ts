import { isBinary } from "../isBinary.js";

function normalizeValue(value: unknown): string | null {
  if (value == null) return null;

  if (isBinary(value)) return null;

  if (value instanceof Date) return value.toISOString();

  if (Array.isArray(value)) return value.join(", ");

  if (typeof value === "object") return JSON.stringify(value);

  return String(value);
}

export default normalizeValue;
