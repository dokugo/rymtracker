const finder = (data, index) => {
  let result = [];
  for (let i = index - 1; i >= 0; i--) {
    if (data[i].type === 'artist') {
      // result = [...result, ...[data[i]]];
      result = [...[data[i]], ...result];
      // result = result.concat([data[i]]);
    }
    if (data[i].type === 'album') {
      break;
    }
  }
  return result;
};

const reducer = arr => {
  const result = arr.reduce((acc, item, index) => {
    if (item.type === 'date') {
      // acc = [...acc, ...[{ date: item }]];
      // change to push() ?
      acc = acc.concat([{ date: item.date, type: 'date' }]);
    }
    if (item.type === 'album') {
      // acc = [...acc, ...[{ artists: finder(index), album: item }]];
      // change to push() ?
      acc = acc.concat([
        { artists: finder(arr, index), album: item, type: 'release' }
      ]);
    }
    return acc;
  }, []);
  return result;
};

module.exports = reducer;
