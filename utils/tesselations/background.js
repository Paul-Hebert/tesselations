export function background(svg) {
  const buffer = Buffer.from(svg);
  return `background-image: url('data:image/svg+xml;base64,${buffer.toString('base64')}');`
}