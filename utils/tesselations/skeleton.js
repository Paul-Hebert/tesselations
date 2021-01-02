module.exports = function(data) {
  return `
<svg 
  xmlns='http://www.w3.org/2000/svg' 
  xmlns:xlink='http://www.w3.org/1999/xlink' 
  width='${data.width}' 
  height='${data.height}' 
  viewBox='0 0 ${data.width} ${data.height}'
>
  <path 
    stroke="${data.stroke}" 
    stroke-width="${data.strokeWidth}"
    fill="${data.fill}" 
    d="${data.commands}" 
    id="root">
  </path>

  <use href="#root" x="${data.width * -1}" y="0"/>
  <use href="#root" x="${data.width}" y="0"/>
  <use href="#root" x="0" y="${data.height}"/>
  <use href="#root" x="0" y="${data.height * -1}"/>
</svg>
  `.trim();
}