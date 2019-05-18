
export function refineCompanyName(keyword) {
  return keyword? keyword.replace('(주)', '').replace('주식회사', '').trim() : '';
}

export function createTextLinks(text) {  
  return (text || "").replace(
    /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
    function(match, space, url){
      var hyperlink = url;
      if (!hyperlink.match('^https?:\/\/')) {
        hyperlink = 'http://' + hyperlink;
      }
      return space + '<a href="' + hyperlink + '" target="blank">' + url + '</a>';
    }
  );
  
};