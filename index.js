const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express')
const app = express()
const replaceString = (str) => {
  return str.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, ' ');
}
const keyword = ($) => {
  var keyword = [];
  $('article .keywordsDiv a').map(function (i, item) {
    keyword.push($(this).text())
  })
  return keyword
}
const metaTags = ($) => {

  var meta = {
    og: {
      title: undefined
    }
  }
  meta.keywords = $("meta[id='metaKeyword']").attr("content")
  meta.og.description = $("meta[property='og:description']").attr("content").replace('مصراوى', 'اخبار شير')
  meta.description = meta.og.description
  meta.og.locale = $("meta[property='og:locale']").attr("content")
  meta.og.site_name = $("meta[property='og:site_name']").attr("content").replace('مصراوي.كوم', 'اخبار شير')
  meta.og.title = $("meta[property='og:title']").attr("content")
  meta.og.type = $("meta[property='og:type']").attr("content")
  meta.og.width = $("meta[property='og:image:width']").attr("content")
  meta.og.height = $("meta[property='og:image:height']").attr("content")
  meta.og.image = $("meta[property='og:image']").attr("content")
  return meta;


}
const imageUrl = ($) => {

  if ($('.details img')[0]) {
    return $('.details img')[0].attribs['data-cfsrc'];
  } else if ($('li .img-responsive')[0]) {
    return $('li .img-responsive')[0].attribs['data-cfsrc']
  } else if ($('.imageCntnr figure img')[0]) {
    return $('.imageCntnr figure img')[0].attribs['data-cfsrc'];
  }
}
const title = ($) => {
  return $('h1').text()
}
const content = ($) => {
  return $('.details').children().map(function (i, item) {
    return $(this).text();
  }).get().join(" ")
}


app.get('/scrap', (req, res) => {
  const url = req.query.url;
  rp(encodeURI(url))
    .then(function (html) {
      const $ = cheerio.load(html);
      res.send({
        'title': title($),
        'content': content($),
        'keyword': keyword($),
        'img': imageUrl($),
        'meta': metaTags($)
      })
    })
    .catch(function (err) {
      //handle error
      console.log(err)
    });
})

app.get('/', (req, res) => {
  res.send({
    bolyfci: 'welcome to our wibsite'
  })
})
const port = 3000
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))