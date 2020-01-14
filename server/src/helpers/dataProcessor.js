const dataProcessor = data => {
  const reducedData = reduce(data);
  const filteredData = duplicateFilter(reducedData);
  return filteredData;
};

const reduce = arr => {
  const result = arr.reduce((acc, item, index) => {
    /*     if (item.type === 'date') {
      // acc = [...acc, ...[{ date: item }]];
      // change to push() ?
      acc = acc.concat([{ date: item.date, type: 'date' }]);
    } */
    if (item.type === 'album') {
      // acc = [...acc, ...[{ artists: finder(index), album: item }]];
      // change to push() ?
      acc = acc.concat([
        {
          artists: findArtists(arr, index),
          album: item,
          date: findDate(arr, index),
          type: 'release'
        }
      ]);
    }
    return acc;
  }, []);
  return result;
};

const findArtists = (data, index) => {
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

const findDate = (data, index) => {
  let result;
  for (let i = index - 1; i >= 0; i--) {
    if (data[i].type === 'date') {
      result = data[i].date;
      break;
    }
  }
  return result;
};

const duplicateFilter = data => {
  const filteredData = data.filter((item, index, arr) => {
    return (
      item.album.text !==
      (arr[index + 1] && arr[index + 1].album && arr[index + 1].album.text)
    );
  });
  return filteredData;
};

module.exports = dataProcessor;
