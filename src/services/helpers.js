export function formatDate(date) {
  return new Intl.DateTimeFormat("en-UK").format(date);
}
