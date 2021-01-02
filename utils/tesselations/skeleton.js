module.exports = function({width, height, stroke, strokeWidth, fill, commands}) {
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