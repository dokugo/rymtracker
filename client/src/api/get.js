const DOMAIN = process.env.REACT_APP_DOMAIN;
const API_KEY = process.env.REACT_APP_API_KEY;

const request = async inputData => {
  return fetch(`${DOMAIN}/crawl/${inputData}`, {
    headers: { 'X-API-Key': API_KEY }
  })
    .then(response => response.json())
    .then(response => response)
    .catch(error => console.error(error));
};

export default request;
