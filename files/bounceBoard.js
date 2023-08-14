// Resize SVG to fit window size
function resizeSVG() {
  let bbox = svg.getBoundingClientRect();
   svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
}
// Initially resize SVG
resizeSVG();

// Listen for window size change events and resize the SVG
window.addEventListener('resize', resizeSVG);

let bounceBoardsLeft = [];
let bounceBoardsRight = [];
const boardHeight = 25; // 
const boardSpacing = 55; // 
let boardWidth = 200; // ）

const numBoards = Math.floor((window.innerHeight - boardHeight) / (boardHeight + boardSpacing)) + 1;
console.log("反弹板数量：" + numBoards);

// Create left side boards
for (let i = 0; i < numBoards; i++) {
  let x = 0; // x position of boards
  let y = i * (boardHeight + boardSpacing); // y position of boards
  let bounceBoard = createBounceBoard(x, y, boardWidth, boardHeight);
  bounceBoardsLeft.push(bounceBoard);

  // Set boards colour as white
  bounceBoard.setAttribute("fill", "white");
  svg.appendChild(bounceBoard);
}

// Create right side boards
for (let i = 0; i < numBoards; i++) {
  let x = (window.innerWidth - boardWidth) / window.innerWidth * 100 + '%'; // The x-coordinate of the bounce plate is adaptive using a percentage representation
  let y = i * (boardHeight + boardSpacing); // 
  let bounceBoard = createBounceBoard(x, y, boardWidth, boardHeight);
  bounceBoardsRight.push(bounceBoard);

  // 
  bounceBoard.setAttribute("fill", "white");
  svg.appendChild(bounceBoard);
}

// Create
function createBounceBoard(x, y, width, height) {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
  return rect;
}

