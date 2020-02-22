'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rp = require('request-promise');
var cheerio = require('cheerio');

var app = (0, _express2.default)();
var replaceString = function replaceString(str) {
  return str.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ' ');
};
var keyword = function keyword($) {
  var keyword = [];
  $('article .keywordsDiv a').map(function (i, item) {
    keyword.push($(this).text());
  });
  return keyword;
};
var metaTags = function metaTags($) {

  var meta = {
    og: {
      title: undefined
    }
  };
  meta.keywords = $("meta[id='metaKeyword']").attr("content");
  meta.og.description = $("meta[property='og:description']").attr("content").replace('مصراوى', 'اخبار شير');
  meta.description = meta.og.description;
  meta.og.locale = $("meta[property='og:locale']").attr("content");
  meta.og.site_name = $("meta[property='og:site_name']").attr("content").replace('مصراوي.كوم', 'اخبار شير');
  meta.og.title = $("meta[property='og:title']").attr("content");
  meta.og.type = $("meta[property='og:type']").attr("content");
  meta.og.width = $("meta[property='og:image:width']").attr("content");
  meta.og.height = $("meta[property='og:image:height']").attr("content");
  meta.og.image = $("meta[property='og:image']").attr("content");
  return meta;
};
var imageUrl = function imageUrl($) {

  if ($('.details img')[0]) {
    return $('.details img')[0].attribs['data-cfsrc'];
  } else if ($('li .img-responsive')[0]) {
    return $('li .img-responsive')[0].attribs['data-cfsrc'];
  } else if ($('.imageCntnr figure img')[0]) {
    return $('.imageCntnr figure img')[0].attribs['data-cfsrc'];
  }
};
var title = function title($) {
  return $('h1').text();
};
var content = function content($) {
  return $('.details').children().map(function (i, item) {
    return $(this).text();
  }).get().join(" ");
};

app.get('/scrap', function (req, res) {
  var url = req.query.url;
  rp(encodeURI(url)).then(function (html) {
    var $ = cheerio.load(html);
    res.send({
      'title': title($),
      'content': content($),
      'keyword': keyword($),
      'img': imageUrl($),
      'meta': metaTags($)
    });
  }).catch(function (err) {
    //handle error
    console.log(err);
  });
});

app.get('/', function (req, res) {
  res.send({
    bolyfci: 'welcome to our wibsite'
  });
});
var port = 3000;
app.listen(process.env.PORT || port, function () {
  return console.log('Example app listening on port ' + port + '!');
});