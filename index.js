import Board from "./board";

// let gemNode = document.createElement('div');
// gemNode.className = 'gem';

// let boardNode = document.querySelector('.board');
// boardNode.appendChild(gemNode);

// setTimeout(() => {
//     gemNode.classList.add('translate');
// }, 1);
window.board = new Board(9, 16);
board.build();