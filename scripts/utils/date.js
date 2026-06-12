export function addBusinessDays(startDate, days) {
  let date = startDate.add(days, 'day');

  while (date.day() === 0 || date.day() === 6) {
    date = date.add(1, 'day');
  }

  return date;
}

export default addBusinessDays;