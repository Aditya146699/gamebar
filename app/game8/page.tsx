"use client";
// pages/queen-puzzle.tsx

import React, { useState, useEffect } from 'react';

type QueenPuzzleProps = Record<string, never>;

const QueenPuzzle: React.FC<QueenPuzzleProps> = () => {
  const [boardSize, setBoardSize] = useState(8);
  const [userQueens, setUserQueens] = useState<number[]>(Array(boardSize).fill(-1));
  const [isGameWon, setIsGameWon] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setUserQueens(Array(boardSize).fill(-1));
    setIsGameWon(false);
    setMessage('');
  }, [boardSize]);

  const isSafe = (row: number, col: number, currentQueens: number[]): boolean => {
    for (let i = 0; i < row; i++) {
      if (
        currentQueens[i] === col ||
        currentQueens[i] - i === col - row ||
        currentQueens[i] + i === col + row
      ) {
        return false;
      }
    }
    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    const newUserQueens = [...userQueens];
    newUserQueens[row] = col;
    setUserQueens(newUserQueens);
  };

  const handleSubmit = () => {
    const isValid = userQueens.every((q, r) => q !== -1 && isSafe(r, q, userQueens));
    if (isValid) {
      setIsGameWon(true);
      setMessage('Congratulations! You found a valid solution!');
    } else {
      setIsGameWon(false);
      setMessage('Incorrect solution. Try again!');
    }
  };

  const renderBoard = (queensToRender: number[]) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 50px)`, gap: '2px' }}>
        {Array.from({ length: boardSize * boardSize }).map((_, index) => {
          const row = Math.floor(index / boardSize);
          const col = index % boardSize;
          const isQueen = queensToRender[row] === col;
          const isDark = (row + col) % 2 === 1;

          return (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: isDark ? 'gray' : 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                cursor: 'pointer',
                border: '1px solid black',
              }}
              onClick={() => handleCellClick(row, col)}
            >
              {isQueen && '♛'}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
  
      <label>
        Board Size:
        <input
          type="number"
          value={boardSize}
          onChange={(e) => setBoardSize(Math.max(4, parseInt(e.target.value, 10)))}
          min="4"
        />
      </label>
      <button onClick={handleSubmit}>Submit Solution</button>
      {renderBoard(userQueens)}
      {message && <p style={{ color: isGameWon ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default QueenPuzzle;
