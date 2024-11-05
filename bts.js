import { mergeSort } from "./mergesort.js";
function Tree(array) {
  let root = null;

  if (array) {
    console.log(buildTree(array));
  }

  const Node = (data) => {
    return {
      data,
      leftNode: "null",
      rightNode: "null",
    };
  };

  function buildTree(array) {
    let sortedArray = mergeSort(array);
    sortedArray = removeDupes(sortedArray);

    return sortedArray;
  }
}

function removeDupes(array) {
  let currentDupe = 0;
  for (let i = 0; i < array.length; i++) {
    if (currentDupe === array[i]) {
      array.splice(i, 1);
    } else {
      currentDupe = array[i];
    }
  }
  return array;
}

Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
