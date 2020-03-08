const DOMAIN = process.env.REACT_APP_DOMAIN;
const API_KEY = process.env.REACT_APP_API_KEY;

const request = async inputData => {
  return fetch(`${DOMAIN}/users/subscribe`, {
    method: 'PUT',
    body: JSON.stringify(inputData),
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0'
    }
  })
    .then(response => response.json())
    .then(response => response)
    .catch(error => console.error(error));
};

export default request;
