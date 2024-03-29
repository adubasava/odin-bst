import { Tree } from './bst.js';

let array = generateArray();
let testTree = new Tree(array);

console.log('Is it balanced?', testTree.isBalanced());

console.log('Postorder', testTree.postOrder());
console.log('Preorder', testTree.preOrder());
console.log('Inorder', testTree.inOrder());
console.log('Level order', testTree.levelOrder());
testTree.insert(120);
testTree.insert(121);
testTree.insert(122);
testTree.insert(123);
testTree.insert(124);
testTree.insert(125);
console.log('Is it balanced?', testTree.isBalanced());
testTree.rebalance();
console.log('Is it balanced?', testTree.isBalanced());
console.log('Postorder', testTree.postOrder());
console.log('Preorder', testTree.preOrder());
console.log('Inorder', testTree.inOrder());
console.log('Level order', testTree.levelOrder());

console.log(testTree.prettyPrint());

function generateArray() {
    return Array.from({length: 30}, () => Math.floor(Math.random() * 99));
}
