export function copyCode(sourceEl) {
  return navigator.clipboard.writeText(sourceEl.innerText);
}