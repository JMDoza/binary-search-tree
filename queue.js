function Queue() {
  let head = null;
  let tail = null;
  let size = 0;

  const Node = (data) => {
    return {
      data,
      nextNode: null,
    };
  };

  const enqueue = (data) => {
    size++;
    const newNode = Node(data);
    if (!head) {
      head = newNode;
    }

    if (!tail) {
      tail = newNode;
    } else {
      tail.nextNode = newNode;
    }
  };

  const dequeue = () => {
    size--;
    const temp = head;
    head = head.nextNode;
    temp.nextNode = null;
    return temp;
  };

  return {
    enqueue,
    dequeue,
  };
}

export { Queue };
