import React, { useState } from 'react';
import './App.css'; 

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onSquareClick }) => (
  <div className="board">
    {squares.map((square, i) => <Square key={i} value={square} onClick={() => onSquareClick(i)} />)}
  </div>
);

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);

  const handleClick = (index) => {
    if (squares[index] || winner) return;
  
    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="container">
    <div className="game">
      <h1 className="header">Tic Tac Toe</h1>
      <Board squares={squares} onSquareClick={handleClick} />
      <p className="status">{status}</p>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
    </div>
  );
};

export default Game;
