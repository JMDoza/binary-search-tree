import { mergeSort } from "./mergesort.js";
import { Queue } from "./queue.js";
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

  const remove = (data) => {
    let parent = null;
    let current = root;
    // Find the node to remove and keep track of the parent
    while (current && current.data !== data) {
      parent = current;
      if (data < current.data) {
        current = current.leftNode;
      } else if (data > current.data) {
        current = current.rightNode;
      }
    }

    if (!current) {
      console.log("Value does not exist!");
      return;
    }

    const left = current.leftNode;
    const right = current.rightNode;

    if (!left && !right) {
      parent.data > data ? (parent.leftNode = null) : (parent.rightNode = null);
    } else if (!left || !right) {
      if (parent.leftNode === current) {
        parent.leftNode = current.rightNode;
      } else {
        parent.rightNode = current.rightNode;
      }
    } else {
      let successorParent = current;
      let successor = current.rightNode;

      while (successor.leftNode) {
        successorParent = successor;
        successor = successor.leftNode;
      }

      current.data = successor.data;

      if (successorParent.leftNode === successor) {
        successorParent.leftNode = successor.rightNode;
      } else {
        successorParent.rightNode = successor.rightNode;
      }
    }
  };

  const find = (value) => {
    let current = root;
    while (current && current.data !== value) {
      if (value < current.data) {
        current = current.leftNode;
      } else if (value > current.data) {
        current = current.rightNode;
      }
    }

    if (!current) {
      console.log("Value does not exist!");
      return;
    } else {
      return current;
    }
  };

  const levelOrder = (callback) => {
    let queue = Queue();
    queue.enqueue(root);
    while (!queue.isEmpty()) {
      let current = queue.dequeue();
      callback(current);

      if (current.leftNode) {
        queue.enqueue(current.leftNode);
      }
      if (current.rightNode) {
        queue.enqueue(current.rightNode);
      }

      // console.log(queue.toString());
    }
  };

  if (array) {
    array = mergeSort(array);
    array = removeDupes(array);
    root = buildTree(array, 0, array.length - 1);
  }

  return { getRoot, insert, remove, find, levelOrder };
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

tree.levelOrder((node) => {
  console.log(node.data);
});
tree.remove(5);
console.log(tree.find(5));
prettyPrint(tree.getRoot());
