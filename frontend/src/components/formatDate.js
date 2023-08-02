export function formatDate(stringDate) {
  return stringDate.replace(/-/g, "/").slice(0, 10);
}