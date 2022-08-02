export function convertDateToISOFormat(date) {
  if (!date) return;

  if (!dateIsValid(date)) return date.split('T')[0];

  return date.toISOString().split('T')[0];
}

export function getDateInRegionalFormat(date) {
  let isoDate = convertDateToISOFormat(date);
  let tempDate = new Date(isoDate);
  let dateInRegionalFormat = `${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
  console.log(dateInRegionalFormat);
  return dateInRegionalFormat;
}

export function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export function getItemNameById(list, id) {
  if (!list) return '';
  let items = list.filter((x) => x.id === id);
  if (items && items.length > 0) return items[0].name;
  else return '';
}

/* Method to check if the date is a valid Date Object in JavaScript or not */
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}
