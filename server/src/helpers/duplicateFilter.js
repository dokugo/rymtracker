const duplicateFilter = data => {
  const filteredData = data.filter((item, index, arr) => {
    return (
      item.album.text !==
      (arr[index + 1] && arr[index + 1].album && arr[index + 1].album.text)
    );
  });
  return filteredData;
};

module.exports = duplicateFilter;
