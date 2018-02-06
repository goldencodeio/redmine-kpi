function formatDate(date) {
  return date.toJSON().split('T').shift();
}

function getDateRage() {
  return '><' + formatDate(OPTIONS.datesRange[0]) + '|' + formatDate(OPTIONS.datesRange[1]);
}