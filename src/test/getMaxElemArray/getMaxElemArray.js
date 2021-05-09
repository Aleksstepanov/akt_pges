function getMaxElemArray(arr) {
  const max = arr.reduce(
    (acc, elem) => (elem > acc ? (acc = elem) : acc),
    arr[0]
  );
  return max;
}

export default getMaxElemArray;
