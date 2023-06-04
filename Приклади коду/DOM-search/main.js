const colors = ['#DCD6F7', '#A6B1E1', '#B4869F'];
const parentElement = 'UL';
const elementToStyle = 'LI';

const colorizeBFS = (node) => {
  const queue = [];

  queue.push({
    node,
    depth: 0,
  });

  while(queue.length) {
    const { node: currentNode, depth: currentDepth } = queue.shift();
    const isStylable = currentNode.tagName === elementToStyle

    if (isStylable) {
      currentNode.style.backgroundColor = colors[currentDepth % 3];
    }

    for (const node of currentNode.children) {
      queue.push({
        node,
        depth: isStylable ? currentDepth + 1 : currentDepth,
      })
    }
  }
};

const colorizeDFS = (node) => {
  const recursive = (node, currentDepth = -1) => {
    const depth = node.tagName === parentElement ? currentDepth + 1 : currentDepth;

    if (node.localName === 'li') {
      node.style.backgroundColor = colors[currentDepth % 3];
    }

    for (const child of node.children) {
      recursive(child, depth);
    }
  };

  recursive(node);
};

const body = document.querySelector('body');
colorizeBFS(body);
colorizeDFS(body);
