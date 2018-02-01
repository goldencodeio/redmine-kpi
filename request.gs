function APIRequest(reqUrl, options) {
  var url = encodeURI('http://redmine.zolotoykod.ru/' + reqUrl + '.json?key=' + API_KEY);
  if (!options) options = {};
  if (options.query) {
    options.query.forEach(function(item) {
      url += '&' + item.key + '=' + item.value;
    });
    delete options.query;
  }

  var response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}
