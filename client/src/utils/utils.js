export const validateUsername = username => {
  const regex = /^[\w_]*$/;
  const noForbiddenSymbols = regex.test(username);
  const notTooLong = username.length < 25;
  const notTooShort = username.length > 2;
  return noForbiddenSymbols && notTooLong && notTooShort;
};

export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const cleanObject = object =>
  Object.keys(object).forEach(
    key => (object[key] = object[key].trim().toLowerCase())
  );
