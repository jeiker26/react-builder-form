export const transformFalseValue = value => {
  if (Array.isArray(value)) {
    return [];
  }

  if (typeof value === "boolean") {
    return false;
  }

  return "";
};

export const insertOrDeleteElemntArray = (a, value) => {
  const index = a.indexOf(value);
  index === -1 ? a.push(value) : a.splice(index, 1);
  return a;
};

export const convertIntoArray = element => {
  return (Array.isArray(element) ? [...element] : [element]).filter(e => !!e);
};
