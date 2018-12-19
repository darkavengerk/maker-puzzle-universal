
export function refineCompanyName(keyword) {
  return keyword.replace('(주)', '').replace('주식회사', '').trim();
}