const deepClone = (obj) => {
  let cloneObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] && typeof obj[key] === "object") {
          cloneObj[key] = deepClone(obj[key]);
        } else {
          cloneObj[key] = obj[key];
        }
      }
    }
  }
  return cloneObj;
};

export { deepClone };
