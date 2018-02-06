function main() {
  initOptions();
  initTable();
  processKPIs();
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.addMenu('GoldenCode KPI', [
    {name: 'Рассчитать KPI', functionName: 'main'}
  ]);
}