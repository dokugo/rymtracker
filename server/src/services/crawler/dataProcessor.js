const dataProcessor = data => {
  const reducedData = reduce(data);
  const filteredData = duplicateFilter(reducedData);
  return filteredData;
};

// reduce function is merging raw crawled data into convenient form
//
// exaple of a raw data:
//
// [
//   {
//     {type: "date", ...},
//     {type: "artist", ...},
//     {type: "album", ...},
//     {type: "date", ...},
//     {type: "artist", ...},
//     {type: "artist", ...},
//     {type: "album", ...}
//   }
// ]
//
// example of a processed data:
//
// [
//   {
//     {type: "release", date: '...', album: '...', artists: [{...}]},
//     {type: "release", date: '...', album: '...', artists: [{...}, {...}]}
//   }
// ]

const reduce = arr => {
  const result = arr.reduce((acc, item, index) => {
    if (item.type === 'album') {
      // acc = [...acc, ...[{ artists: findArtists(arr, index), album: item, date: findDate(arr, index), type: 'release' }]];
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

// Remove duplicate releases.
// Duplicate releases are present if user have rated several separate artists
// and someday two or more of them releasing collaborative album.

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
