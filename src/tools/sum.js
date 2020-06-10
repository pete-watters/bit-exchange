const ONE_THOUSAND = 1000;

export const sumFloats = (a, b) =>
  (a * ONE_THOUSAND + b * ONE_THOUSAND) / ONE_THOUSAND;
export const subtractFloats = (a, b) =>
  (b * ONE_THOUSAND - a * ONE_THOUSAND) / ONE_THOUSAND;
export const sumArray = (array, index) => array
  .map(item => item[index])
  .reduce((a, b) => sumFloats(a, b));
