export const sortByColumn = (array, columnIndex) =>
  array.sort((a, b) => {
    const equal = a[columnIndex] === b[columnIndex];
    const firstGreater = a[columnIndex] > b[columnIndex];
    if (equal) {
      return 0;
    }
    return firstGreater ? -1 : 1;
  });
