export const imageUrl = ($) => {

  if ($('.details img')[0]) {
    return $('.details img')[0].attribs['data-cfsrc'];
  } else if ($('li .img-responsive')[0]) {
    return $('li .img-responsive')[0].attribs['data-cfsrc']
  } else if ($('.imageCntnr figure img')[0]) {
    return $('.imageCntnr figure img')[0].attribs['data-cfsrc'];
  }
}

export const content = ($) => {
  return $('.details').children().map(function (i, item) {
    return $(this).text();
  }).get().join(" ")
}

export const keyword = ($) => {
  var keyword = [];
  $('article .keywordsDiv a').map(function (i, item) {
    keyword.push($(this).text())
  })
  return keyword
}