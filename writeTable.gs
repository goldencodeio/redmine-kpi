function initTable() {
  writeHeader();
  writeUserRows();
}

function writeHeader() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnI = 2;
  KPI.forEach(function(k) {
    sheet.getRange(1, columnI++).setValue(k.name);
  });
}

function writeUserRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowI = 2;
  users = OPTIONS.users;
  if (!Array.isArray(users)) users = [users];
  users.forEach(function(user, i) {
    var userData = APIRequest('users', {query: [{key: 'name', value: user}]}).users[0];
    sheet.getRange(rowI++, 1).setValue(userData.firstname + ' ' + userData.lastname);
    OPTIONS.users[i] = userData;
  });
}
