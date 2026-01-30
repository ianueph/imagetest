export function isBinary(value: unknown): boolean {
  return (
    value instanceof Uint8Array ||
    value instanceof ArrayBuffer ||
    (typeof Buffer !== "undefined" && Buffer.isBuffer(value))
  );
}