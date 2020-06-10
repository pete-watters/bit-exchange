export const findMatchingSubstring = (current, comparison) => {
  let matchedCharacters = '';
  const currentString = String(current);
  const comparisonString = String(comparison);
  const offset = currentString.length - comparisonString.length;
  if (comparisonString.length === 0) {
    return ['', currentString];
  }
  for (let i = 0; i < currentString.length; i += 1) {
    if (currentString[i + offset] === comparisonString[i]) {
      matchedCharacters += comparisonString[i];
    } else {
      break;
    }
  }
  return [matchedCharacters, currentString.replace(matchedCharacters, '')];
};
