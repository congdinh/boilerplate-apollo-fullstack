export const cleanObject = object => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === "object") cleanObject(v);
    if (
      (v && typeof v === "object" && !Object.keys(v).length) ||
      v === null ||
      v === undefined ||
      v.length === 0
    ) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};
