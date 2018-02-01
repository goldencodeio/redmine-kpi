var OPTIONS = {};

function initOptions() {
  var _ss = SpreadsheetApp.getActiveSpreadsheet();

  // cache current active sheet
  var currentSheet = _ss.getActiveSheet();

  // get options sheet
  var optionsSheet = _ss.setActiveSheet(getOptionsSheet());

  var data = optionsSheet.getRange(1, optionsSheet.getLastColumn() - 1, optionsSheet.getLastRow() - 1).getValues();
  data.forEach(function(row) {
    var key = row.shift();
    OPTIONS[key] = row.length > 1 ? row : row[0];
  });
}

function getOptionsSheet() {
  var sheets = _ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName().toLowerCase() === 'options')
      return sheets[i];
  }
  return null;
}