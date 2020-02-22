export const meta = ($) => {

  var meta = {
    og: {
      title: undefined
    }
  }
  meta.keywords = $("meta[id='metaKeyword']").attr("content")
  meta.og.description = $("meta[property='og:description']").attr("content")
  meta.description = meta.og.description
  meta.og.locale = $("meta[property='og:locale']").attr("content")
  meta.og.site_name = $("meta[property='og:site_name']").attr("content")
  meta.og.title = $("meta[property='og:title']").attr("content")
  meta.og.type = $("meta[property='og:type']").attr("content")
  meta.og.width = $("meta[property='og:image:width']").attr("content")
  meta.og.height = $("meta[property='og:image:height']").attr("content")
  meta.og.image = $("meta[property='og:image']").attr("content")
  return meta;

}