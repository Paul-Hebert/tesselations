export function skeleton({
  width,
  height,
  stroke,
  strokeWidth,
  fill,
  commands,
}) {
  width = xssEscape(width);
  height = xssEscape(height);
  stroke = xssEscape(stroke);
  strokeWidth = xssEscape(strokeWidth);
  fill = xssEscape(fill);
  commands = xssEscape(commands);

  return `
<svg 
  xmlns='http://www.w3.org/2000/svg' 
  xmlns:xlink='http://www.w3.org/1999/xlink' 
  width='${width}' 
  height='${height}' 
  viewBox='0 0 ${width} ${height}'
>
  <path 
    stroke="${stroke}" 
    stroke-width="${strokeWidth}"
    fill="${fill}" 
    d="${commands}" 
    id="root">
  </path>

  <use href="#root" x="${width * -1}" y="0"/>
  <use href="#root" x="${width}" y="0"/>
  <use href="#root" x="0" y="${height}"/>
  <use href="#root" x="0" y="${height * -1}"/>
</svg>
  `.trim();
}

function xssEscape(string) {
  return string
    .toString()
    .replaceAll(/&/g, "")
    .replaceAll(/</g, "")
    .replaceAll(/>/g, "")
    .replaceAll(/"/g, "")
    .replaceAll(/'/g, "")
    .replaceAll(/\//g, "");
}
