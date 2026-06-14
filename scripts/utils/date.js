export function addBusinessDays(startDate, days) {
  let date = startDate;
  let daysAdded = 0;

  while (daysAdded < days) {
    date = date.add(1, 'day');

    if (date.day() !== 0 && date.day() !== 6) {
      daysAdded++;
    }
  }

  return date;
}

export default addBusinessDays;