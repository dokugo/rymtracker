const finder = (data, index) => {
  let result = [];
  for (let i = index - 1; i >= 0; i--) {
    if (data[i].type === 'artist') {
      // result = [...result, ...[data[i]]];
      result = result.concat([data[i]]);
    }
    if (data[i].type === 'album') {
      break;
    }
  }
  return result;
};

const reducer = arr => {
  const result = arr.reduce((acc, item, index) => {
    if (item.type === 'album') {
      // acc = [...acc, ...[{ artists: finder(index), album: item }]];
      acc = acc.concat([{ artists: finder(arr, index), album: item }]);
    }
    return acc;
  }, []);
  return result;
};

module.exports = reducer;
