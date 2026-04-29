// ===============================
// GLOBAL STATE
// ===============================

// Stores currently selected node
let currentNode = null;

// Used to generate unique IDs
let idCount = 0;

// ===============================
// INITIALIZATION
// ===============================

function start() {
  // Attach event listeners
  document.getElementById("byIdButton").onclick = getById;
  document.getElementById("insertButton").onclick = insertBeforeNode;
  document.getElementById("appendButton").onclick = appendChildNode;
  document.getElementById("replaceButton").onclick = replaceCurrent;
  document.getElementById("removeButton").onclick = removeNode;
  document.getElementById("parentButton").onclick = goToParent;

  // Default selected node
  switchTo(document.getElementById("bigheading"));
}

// Run when page loads
window.onload = start;

// ===============================
// CORE SELECTION FUNCTION
// ===============================

// Select node by ID
function getById() {
  const id = document.getElementById("gbi").value;
  const node = document.getElementById(id);

  if (node) {
    switchTo(node);
  } else {
    alert("Element not found");
  }
}

// ===============================
// INSERT BEFORE
// ===============================

function insertBeforeNode() {
  const text = document.getElementById("ins").value; // Get user input, value of text field

  if (!currentNode) return; // No node selected

  const newNode = createNewNode(text); // Create new node with user input

  // Traversal + Manipulation:
  // Go UP → then insert BEFORE current node
  currentNode.parentNode.insertBefore(newNode, currentNode);

  switchTo(newNode);
}

// ===============================
// APPEND CHILD
// ===============================

function appendChildNode() {
  const text = document.getElementById("append").value; // Get user input, value of text field

  if (!currentNode) return;

  const newNode = createNewNode(text);

  // Add as last child
  currentNode.appendChild(newNode);

  switchTo(newNode);
}

// ===============================
// REPLACE CURRENT NODE
// ===============================

function replaceCurrent() {
  const text = document.getElementById("replace").value;

  if (!currentNode) return;

  const newNode = createNewNode(text);

  // Key Concept:
  // Parent controls replacement
  currentNode.parentNode.replaceChild(newNode, currentNode);

  switchTo(newNode);
}

// ===============================
// REMOVE NODE
// ===============================

function removeNode() {
  if (!currentNode) return; // No node selected, so nothing to remove, return early

  // Prevent removing top-level elements
  if (currentNode.parentNode === document.body) {
    // Top-level element is a direct child of body, so check if parent is body
    alert("Cannot remove top-level element");
    return;
  }

  const oldNode = currentNode; // Store reference to current node before deletion, because once we delete it, we won't have access to it anymore

  // Move selection UP before deletion
  switchTo(oldNode.parentNode);

  // Parent removes child
  currentNode.removeChild(oldNode);
}

// ===============================
// GO TO PARENT
// ===============================

function goToParent() {
  if (!currentNode) return;

  const parent = currentNode.parentNode;

  if (parent === document.body) {
    alert("No parent beyond this level");
  } else {
    switchTo(parent);
  }
}

// ===============================
// CREATE NEW NODE
// ===============================

function createNewNode(text) {
  // Generate unique ID
  const nodeId = "new" + idCount++;

  const content = `[${nodeId}] ${text}`; // Content includes ID for easy identification, and user input text, so we can see both the unique ID and the text the user entered in the new node.

  // Create element
  const newNode = document.createElement("p");

  // Assign ID
  newNode.id = nodeId;

  // Create text node
  const textNode = document.createTextNode(content);

  // Append text to element
  newNode.appendChild(textNode);

  return newNode;
}

// ===============================
// SWITCH CURRENT NODE (STATE)
// ===============================

function switchTo(newNode) {
  // Remove highlight from previous
  if (currentNode) {
    currentNode.style.backgroundColor = "";
  }

  // Update current node
  currentNode = newNode;

  // Highlight new node
  currentNode.style.backgroundColor = "yellow";
}
