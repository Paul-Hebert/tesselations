export function encode(
svg) {
  const buffer = Buffer.from(svg);
  return buffer.toString('base64');
}