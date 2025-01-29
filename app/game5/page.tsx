"use client";
import { useState } from 'react';

const ConnectFour = () => {
  // Define types
  type Board = number[][];

  // Constants
  const ROWS = 6;
  const COLS = 7;

  // State variables
  const [board, setBoard] = useState<Board>(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [winner, setWinner] = useState<number | null>(null);

  // Handle player move
  const handleMove = (col: number) => {
    if (winner) return; // Game is over

    // Find the lowest empty row in the selected column
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === 0) {
        const newBoard = [...board];
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        // Check for a win
        if (checkWin(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
        } else {
          // Switch players
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        break;
      }
    }
  };

  // Check for a win
  const checkWin = (board: Board, row: number, col: number, player: number): boolean => {
    // Directions: horizontal, vertical, diagonal (top-left to bottom-right), diagonal (bottom-left to top-right)
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (top-left to bottom-right)
      [1, -1], // Diagonal (bottom-left to top-right)
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      // Check in the positive direction
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < ROWS && y >= 0 && y < COLS && board[x][y] === player) {
        count++;
        x += dx;
        y += dy;
      }

      // Check in the negative direction
      x = row - dx;
      y = col - dy;
      while (x >= 0 && x < ROWS && y >= 0 && y < COLS && board[x][y] === player) {
        count++;
        x -= dx;
        y -= dy;
      }

      // If 4 connected discs are found, return true
      if (count >= 4) return true;
    }

    return false;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '20px',
      }}
    >
      <h1>Connect Four</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '5px' }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor:
                    cell === 0
                      ? '#ddd'
                      : cell === 1
                      ? 'blue'
                      : 'yellow',
                  borderRadius: '50%',
                  border: '1px solid #333',
                  cursor: !winner && cell === 0 ? 'pointer' : 'default',
                }}
                onClick={() => !winner && cell === 0 && handleMove(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {winner ? (
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Player {winner} wins! 🎉
        </p>
      ) : (
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Player {currentPlayer}'s turn
        </p>
      )}
      <button
        onClick={resetGame}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Reset Game
      </button>
    </div>
  );
};

export default ConnectFour;