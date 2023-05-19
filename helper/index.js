function mergeArrays(arr1, arr2, field1, field2) {
  const mergedArray = [];

  // Create a map of objects in arr2 using the specified field as the key
  const map = new Map();
  for (const obj of arr2) {
    const key = obj[field2];
    map.set(key, obj);
  }

  // Iterate through arr1 and merge objects from arr2 based on the specified field
  for (const obj of arr1) {
    const key = obj[field1];
    const mergedObj = { ...obj, ...map.get(key) };
    mergedArray.push(mergedObj);
  }

  return mergedArray;
}

export { mergeArrays };
