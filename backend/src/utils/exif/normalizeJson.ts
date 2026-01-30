import { Prisma } from "#/generated/prisma/client.js";

function normalizeJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value == null) return undefined;

  if (typeof value === "object") return value as Prisma.InputJsonValue;

  return undefined;
}

export default normalizeJson;