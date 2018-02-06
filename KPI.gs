var KPI = [
  {
    code: 'ISSUES_COUNT',
    name: 'Количество выполненных задач'
  },
  {
    code: 'ISSUES_CLIENT_RATING_COUNT',
    name: 'Количество оцененных задач Клиентом'
  },
  {
    code: 'ISSUES_BOSS_RATING_COUNT',
    name: 'Количество оцененных задач Руководителем'
  },
  {
    code: 'CLIENT_RATING_AVG',
    name: 'Средняя оценка от клиента'
  },
  {
    code: 'BOSS_RATING_AVG',
    name: 'Средняя оценка за ведение задачи'
  },
  {
    code: 'TIME_SPENT',
    name: 'Количество списанного времени'
  },
  {
    code: 'OVERTIME_SPENT',
    name: 'Количество времени списанного вне работы'
  }
];

function processKPIs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowI = 2;
  var columnI = 2;
  OPTIONS.users = OPTIONS.users.map(function(user) {
    user.kpis = {};

    KPI.forEach(function(kpi) {
      var kpiValue = getUserKPI(user, kpi.code);
      user.kpis[kpi] = kpiValue;
      sheet.getRange(rowI, columnI++).setValue(kpiValue);
    });

    columnI = 2;
    rowI++;
    return user;
  });
}

function getUserKPI(user, kpi) {
  switch (kpi) {
    case 'ISSUES_COUNT':
      return getIssuesCountByUser(user);
      break;

    case 'ISSUES_CLIENT_RATING_COUNT':
      return getIssuesClientRatingCount(user);
      break;

    case 'ISSUES_BOSS_RATING_COUNT':
      return getIssuesBossRatingCount(user);
      break;

    case 'CLIENT_RATING_AVG':
      return getClientRatingAverage(user);
      break;

    case 'BOSS_RATING_AVG':
      return getBossRatingAverage(user);
      break;

    case 'TIME_SPENT':
      return getTimeSpent(user);
      break;

    case 'OVERTIME_SPENT':
      return getOvertimeSpent(user);
      break;
      
    default:
      return 'Unknown KPI';
      break;
  }
}

function getIssuesCountByUser(user) {
  var res = APIRequest('issues', {query: [
    {key: 'assigned_to_id', value: user.id},
    {key: 'status_id', value: 'closed'},
    {key: 'closed_on', value: getDateRage()}
  ]});
  return res.issues.length;
}

function getIssuesClientRatingCount(user) {
  var res = APIRequest('issues', {query: [
    {key: 'assigned_to_id', value: user.id},
    {key: 'status_id', value: 'closed'},
    {key: 'closed_on', value: getDateRage()},
    {key: 'cf_7', value: '*'}
  ]});
  return res.issues.length;
}

function getIssuesBossRatingCount(user) {
  var res = APIRequest('issues', {query: [
    {key: 'assigned_to_id', value: user.id},
    {key: 'status_id', value: 'closed'},
    {key: 'closed_on', value: getDateRage()},
    {key: 'cf_6', value: '*'}
  ]});
  return res.issues.length;
}

function getClientRatingAverage(user) {
  var res = APIRequest('issues', {query: [
    {key: 'assigned_to_id', value: user.id},
    {key: 'status_id', value: 'closed'},
    {key: 'closed_on', value: getDateRage()},
    {key: 'cf_7', value: '*'}
  ]});
  var sum = res.issues.reduce(function(a, c) {
    return a + parseInt(c.custom_fields.find(function(i) {return i.id === 7}).value, 10);
  }, 0);
  return res.issues.length ? sum / res.issues.length : 0;
}

function getBossRatingAverage(user) {
  var res = APIRequest('issues', {query: [
    {key: 'assigned_to_id', value: user.id},
    {key: 'status_id', value: 'closed'},
    {key: 'closed_on', value: getDateRage()},
    {key: 'cf_6', value: '*'}
  ]});
  var sum = res.issues.reduce(function(a, c) {
    return a + parseInt(c.custom_fields.find(function(i) {return i.id === 6}).value, 10);
  }, 0);
  return res.issues.length ? sum / res.issues.length : 0;
}

function getTimeSpent(user) {
  var res = APIRequest('time_entries', {query: [
    {key: 'user_id', value: user.id},
    {key: 'spent_on', value: getDateRage()}
  ]});
  return res.time_entries.reduce(function(a, c) {
    return a + c.hours;
  }, 0);
}

function getOvertimeSpent(user) {
  var res = APIRequest('time_entries', {query: [
    {key: 'user_id', value: user.id},
    {key: 'spent_on', value: getDateRage()},
    {key: 'cf_19', value: '1'}
  ]});
  return res.time_entries.reduce(function(a, c) {
    return a + c.hours;
  }, 0);
}
