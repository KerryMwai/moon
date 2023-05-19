// Constants
const ROWS = 20;
const COLS = 10;
const EMPTY = 0;
const BLOCK_SIZE = 30;

// Tetromino shapes
const SHAPES = [
  [],
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]]
];

// Colors for each tetromino shape
const COLORS = [
  "#000000",  // Empty
  "#FF0000",  // I
  "#00FF00",  // O
  "#0000FF",  // Z
  "#FF00FF",  // S
  "#00FFFF",  // J
  "#FFFF00",  // L
  "#FFA500"   // T
];

// Game variables
let board;
let currentShape;
let currentRow;
let currentCol;
let timer;

// Initialize the game
function init() {
  board = [];
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = EMPTY;
    }
  }
  currentShape = getRandomShape();
  currentRow = 0;
  currentCol = Math.floor(COLS / 2) - Math.floor(currentShape[0].length / 2);
  drawBoard();
  drawShape();
  timer = setInterval(moveDown, 1000);
}

// Generate a random tetromino shape
function getRandomShape() {
  const index = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
  return SHAPES[index];
}

// Draw the game board
function drawBoard() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      drawSquare(ctx, col, row, board[row][col]);
    }
  }
}

// Draw a square on the game board
function drawSquare(ctx, x, y, colorIndex) {
  const color = COLORS[colorIndex];
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// Draw the current shape on the game board
function drawShape() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      if (currentShape[row][col]) {
        drawSquare(ctx, currentCol + col, currentRow + row, currentShape[row][col]);
      }
    }
  }
}

// Move the current shape down by one
