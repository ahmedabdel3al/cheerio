export const youmContent = ($) => {
  return $('#articleBody').children().map(function (i, item) {
    return $(this).text();
  }).get().join(" ")
}
export const youmTags = ($) => {
  var keyword = [];
  $('.tags h3 a').map(function (i, item) {
    keyword.push($(this).text())
  })
  return keyword
}

export const youmImageUrl = ($) => {
  return $('.img-cont img')[0].attribs['src'];
}