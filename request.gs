function APIRequest(reqUrl, options) {
  var url = encodeURI('http://redmine.zolotoykod.ru/' + reqUrl + '.json?key=' + OPTIONS.apiKey + '&limit=100');
  if (!options) options = {};
  if (options.query) {
    options.query.forEach(function(item) {
      url += '&' + encodeURIComponent(item.key) + '=' + encodeURIComponent(item.value);
    });
    delete options.query;
  }

  var response = UrlFetchApp.fetch(url, options);
  // TODO: catch api errors
  return JSON.parse(response.getContentText());
}
