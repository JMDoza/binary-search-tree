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
    if (!callback) {
      throw new Error("Callback Required");
    }

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
    }
  };

  const inOrder = (node, callback) => {
    if (!callback) {
      throw new Error("Callback Required");
    }

    if (!node) {
      return;
    }

    inOrder(node.leftNode, callback);
    callback(node);
    inOrder(node.rightNode, callback);
  };

  const preOrder = (node, callback) => {
    if (!callback) {
      throw new Error("Callback Required");
    }

    if (!node) {
      return;
    }

    callback(node);
    preOrder(node.leftNode, callback);
    preOrder(node.rightNode, callback);
  };

  const postOrder = (node, callback) => {
    if (!callback) {
      throw new Error("Callback Required");
    }

    if (!node) {
      return;
    }

    postOrder(node.leftNode, callback);
    postOrder(node.rightNode, callback);
    callback(node);
  };

  const heightOf = (node) => {
    if (!node) {
      return 0;
    }
    const leftHeight = heightOf(node.leftNode);
    const rightHeight = heightOf(node.rightNode);

    return 1 + Math.max(leftHeight, rightHeight);
  };

  const depthOf = (node) => {
    if (!node) {
      console.log("Not a valid Node");
      return -1;
    }

    let current = root;
    let depth = 0;
    while (current && current !== node) {
      if (node.data < current.data) {
        current = current.leftNode;
      } else if (node.data > current.data) {
        current = current.rightNode;
      }
      depth++;
    }

    return depth;
  };

  const isBalanced = (node) => {
    const getHeightAndBalance = (node) => {
      if (!node) {
        return 0;
      }

      const leftHeight = getHeightAndBalance(node.leftNode);
      const rightHeight = getHeightAndBalance(node.rightNode);

      const heightDiff = Math.abs(leftHeight - rightHeight);
      if (leftHeight === -1 || rightHeight === -1 || heightDiff > 1) {
        return -1;
      }

      return 1 + Math.max(leftHeight, rightHeight);
    };
    return getHeightAndBalance(node);
  };

  const rebalance = () => {
    let nodeArray = [];
    let nodeData = [];
    inOrder(root, (node) => {
      nodeArray.push(node);
      nodeData.push(node.data);
    });
    root = null;
    nodeArray.forEach((node) => {
      node.leftNode = null;
      node.rightNode = null;
    });

    root = buildTree(nodeData, 0, nodeData.length - 1);
  };

  if (array) {
    array = mergeSort(array);
    array = removeDupes(array);
    root = buildTree(array, 0, array.length - 1);
  }

  return {
    getRoot,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    heightOf,
    depthOf,
    isBalanced,
    rebalance,
  };
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
console.log("===========================");
console.log(tree.isBalanced(tree.getRoot()));
for (let i = 0; i < 100; i++) {
  tree.insert(i);
}
console.log("===========================");
prettyPrint(tree.getRoot());
console.log("===========================");
console.log(tree.isBalanced(tree.getRoot()));
console.log("===========================");
tree.rebalance();
prettyPrint(tree.getRoot());
console.log("===========================");
console.log(tree.isBalanced(tree.getRoot()));

// let levelOrderString = "";
// tree.levelOrder((node) => {
//   levelOrderString += `${node.data} ->`;
// });
// console.log(levelOrderString + "\n");

// let preOrderString = "";
// tree.preOrder(tree.getRoot(), (node) => {
//   preOrderString += `${node.data} ->`;
// });
// console.log(preOrderString + "\n");

// let postOrderString = "";
// tree.postOrder(tree.getRoot(), (node) => {
//   postOrderString += `${node.data} ->`;
// });
// console.log(postOrderString + "\n");

// let inOrderString = "";
// tree.inOrder(tree.getRoot(), (node) => {
//   inOrderString += `${node.data} ->`;
// });
// console.log(inOrderString + "\n");
