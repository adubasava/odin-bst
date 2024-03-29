class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }    
}

class Tree {
    constructor (array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (array == null || array.length == 0) return null;

        // Sort and remove duplicates
        const setFromArr = new Set(array); 
        array = Array.from(setFromArr);
        array.sort(function(a, b){return a - b})
        
        let mid = Math.floor(array.length / 2);

        let rootNode = new Node(array[mid]);
        rootNode.left = this.buildTree(array.slice(0, mid));
        rootNode.right = this.buildTree(array.slice(mid+1, array.length));

        return rootNode;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    insert(value) {     
        this.root = this.insertNode(value, this.root);   
    }

    insertNode(value, root = this.root) {
        if (root === null) {
            return new Node(value);
        }
        
        if (value < root.value) {
            root.left = this.insertNode(value, root.left);
        } else if (value > root.value) {
            root.right = this.insertNode(value, root.right);
        }
        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) return null;

        if (root.value > value) {
            root.left = this.deleteItem(value, root.left);
        } else if (root.value < value) {
            root.right = this.deleteItem(value, root.right);
        } 
     
        if (root.value === value && root.left && root.right) {
          let temp = root.right;
          let previous = root;
          while (temp.left) {
            previous = temp;
            temp = temp.left;
          }
          if (temp.right) {
            previous.left = temp.right;
          } else {
            previous.left = null;
          }
          root.value = temp.value;
          return root;
        }
    
        if (root.value === value && (!root.left || !root.right)) {
          return (root = root.left || root.right);
        }
    
        if (root.value === value) return (root = null);
    
        return root;
    }

    find(value) {
        let root = this.root;
        while (root) {
            if (value === root.value) {
                return root;
            } else if (value < root.value) {
                root = root.left;
            } else if (value > root.value) {
                root = root.right;
            }
        }
        return null;
    }

    levelOrder(callback, queue = [this.root], array = []) {
        if (queue[0].left) {
            queue.push(queue[0].left);
        }
        if (queue[0].right) {
            queue.push(queue[0].right);
        }

        if (callback) {
            callback(queue.shift());
        } else {
            array.push(queue.shift().value);
        }

        if (queue.length !== 0) {
            this.levelOrder(callback, queue, array);
        }

        return (callback) ? callback : array;
        
    }

    // left, root, right
    inOrder(callback, root = this.root, array = []) {
        if (!root) return;

        if (root.left) {
            this.inOrder(callback, root.left, array);
        }

        if (callback) {
            callback(root);
        } else {
            array.push(root.value);
        }

        if (root.right) {
            this.inOrder(callback, root.right, array);
        }

        return (callback) ? callback : array;
    }

    // root, left, right
    preOrder(callback, root = this.root, array = []) {
        if (!root) return;

        if (callback) {
            callback(root);
        } else {
            array.push(root.value);
        }

        if (root.left) {
            this.preOrder(callback, root.left, array);
        }

        if (root.right) {
            this.preOrder(callback, root.right, array);
        }

        return (callback) ? callback : array;
    }

    // left, right, root
    postOrder(callback, root = this.root, array = []) {
        if (!root) return;

        if (root.left) {
            this.postOrder(callback, root.left, array);
        }

        if (root.right) {
            this.postOrder(callback, root.right, array);
        }

        if (callback) {
            callback(root);
        } else {
            array.push(root.value);
        }

        return (callback) ? callback : array;
    }

    height(root = this.root) {
        if (!root) return 0;

        let left = this.height(root.left);
        let right = this.height(root.right);

        return Math.max(left, right) + 1;
    }

    depth(node = this.root) {
        node = this.find(node);
        if (!node) return null;

        let count = 0;
        let root = this.root;
        while (root) {
            if (node.value === root.value) {
                return count;
            } else if (node.value < root.value) {
                count++;
                root = root.left;
            } else if (node.value > root.value) {
                count++;
                root = root.right;
            }
        }
    }

    isBalanced(root = this.root) {
        if (!root) return null;

        let left = this.height(root.left);
        let right = this.height(root.right);
        if (Math.abs(left - right) > 1) {
            return false;
        }

        this.isBalanced(root.left);
        this.isBalanced(root.right);
        return true;
    }

    rebalance() {
        this.root = this.buildTree(this.levelOrder());
    }

}


// Testing

let testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
//console.log(testTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
//console.log(testTree.prettyPrint());
//testTree.insert(5);
//testTree.insert(11);
//testTree.insert(12);
//testTree.insert(8);
//testTree.deleteItem(23);
//testTree.deleteItem(5);
//testTree.deleteItem(4);
//console.log(testTree);
//console.log(testTree.find(8));
//console.log(testTree.find(6345));
//console.log(testTree.height());
//console.log(testTree.depth(6345));
//console.log(testTree.depth(5));
//console.log(testTree.depth(6344));
//console.log(testTree.isBalanced());
//testTree.rebalance();
//console.log(testTree.postOrder());
//console.log(testTree.preOrder());
//console.log(testTree.inOrder());
//console.log(testTree.levelOrder());
//console.log(testTree.prettyPrint());

export { Tree, Node }