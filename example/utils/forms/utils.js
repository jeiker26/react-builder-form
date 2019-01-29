export const transformFalseValue = value => {
  if (Array.isArray(value)) {
    return [];
  }

  if (typeof value === "boolean") {
    return false;
  }

  return "";
};
