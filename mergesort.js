function mergeSort(array) {
  const length = array.length;

  if (length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);

  let leftArr = [];
  let rightArr = [];

  for (let i = 0; i < mid; i++) {
    leftArr[i] = array[i];
  }

  for (let i = 0; i < length - mid; i++) {
    rightArr[i] = array[i + mid];
  }

  leftArr = mergeSort(leftArr);
  rightArr = mergeSort(rightArr);
  return merge(leftArr, rightArr);
}

function merge(left, right) {
  const leftLen = left.length;
  const rightLen = right.length;
  let mergedArr = [];
  let pointerL = 0;
  let pointerR = 0;

  while (pointerL < leftLen && pointerR < rightLen) {
    if (left[pointerL] < right[pointerR]) {
      mergedArr.push(left[pointerL]);
      pointerL++;
    } else {
      mergedArr.push(right[pointerR]);
      pointerR++;
    }
  }

  while (pointerR < rightLen) {
    mergedArr.push(right[pointerR]);
    pointerR++;
  }

  while (pointerL < leftLen) {
    mergedArr.push(left[pointerL]);
    pointerL++;
  }

  return mergedArr;
}

export { mergeSort };
