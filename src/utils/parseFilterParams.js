const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (boolean) => {
  //Fiest variant
  // const isBooleanString = typeof boolean == 'string';

  if (typeof boolean === 'string') {
    if (boolean.toLowerCase() === 'true') return true;
    if (boolean.toLowerCase() === 'false') return false;
  }
  return;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};