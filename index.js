const rp = require('request-promise');
const cheerio = require('cheerio');
import express from 'express'
import { meta } from './scrap/meta'
import { title } from './scrap/title'
import { content, imageUrl, keyword } from './scrap/masrawy'
import { youmContent, youmTags, youmImageUrl } from './scrap/youm'
const app = express()



app.get('/scrap-masrawy', (req, res) => {
  const url = req.query.url;
  rp(encodeURI(url))
    .then(function (html) {
      const $ = cheerio.load(html);
      res.send({
        'title': title($),
        'content': content($),
        'keyword': keyword($),
        'img': imageUrl($),
        'meta': meta($)
      })
    })
    .catch(function (err) {
      //handle error
      console.log(err)
    });
})


app.get('/scrap-youm7', (req, res) => {
  const url = req.query.url;
  rp(encodeURI(url))
    .then(function (html) {
      const $ = cheerio.load(html);
      res.send({
        'title': title($),
        'content': youmContent($),
        'keyword': youmTags($),
        'img': youmImageUrl($),
        'meta': meta($),
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