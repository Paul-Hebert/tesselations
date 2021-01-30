export async function copyCode(sourceEl) {
  await navigator.clipboard.writeText(sourceEl.innerText);

  // TODO: Notify user
}