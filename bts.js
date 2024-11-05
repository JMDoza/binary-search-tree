import { mergeSort } from "./mergesort.js";
function Tree(array) {
  let root = null;

  const Node = (data) => {
    return {
      data,
      leftNode: null,
      rightNode: null,
    };
  };

  const getRoot = () => {
    return root;
  };

  const buildTree = (array, start, end) => {
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);

    const rootNode = Node(array[mid]);
    rootNode.leftNode = buildTree(array, start, mid - 1);
    rootNode.rightNode = buildTree(array, mid + 1, end);

    return rootNode;
  };

  const insert = (data) => {
    let current = root;
    while (current !== null) {
      const left = current.leftNode;
      const right = current.rightNode;

      if (left && current.data > data) {
        current = left;
      } else if (right && current.data < data) {
        current = right;
      } else {
        break;
      }
    }

    if (current.data === data) {
      return;
    }

    const newNode = Node(data);
    current.data > data
      ? (current.leftNode = newNode)
      : (current.rightNode = newNode);
  };

  if (array) {
    array = mergeSort(array);
    array = removeDupes(array);
    root = buildTree(array, 0, array.length - 1);
  }

  return { getRoot, insert };
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
  console.log(array);
  return array;
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

let tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.getRoot());
tree.insert(2);
tree.insert(20);
tree.insert(21);
tree.insert(22);
prettyPrint(tree.getRoot());
