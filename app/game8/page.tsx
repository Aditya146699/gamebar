"use client";
// pages/queen-puzzle.tsx

import React, { useState } from 'react';

type QueenPuzzleProps = Record<string, never>;

const QueenPuzzle: React.FC<QueenPuzzleProps> = () => {
  const [boardSize, setBoardSize] = useState(8);
  const [queens, setQueens] = useState<number[]>(Array(boardSize).fill(-1));
  const [solution, setSolution] = useState<number[][]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [userQueens, setUserQueens] = useState<number[]>(Array(boardSize).fill(-1));
  const [isUserPlaying, setIsUserPlaying] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const isSafe = (row: number, col: number, currentQueens: number[]): boolean => {
    for (let i = 0; i < row; i++) {
      if (currentQueens[i] === col ||
        currentQueens[i] - i === col - row ||
        currentQueens[i] + i === col + row) {
        return false;
      }
    }
    return true;
  };

  const solveNQueens = (boardSize: number): number[][] => {
    const solutions: number[][] = [];
    const currentQueens: number[] = Array(boardSize).fill(-1);

    const solve = (row: number) => {
      if (row === boardSize) {
        solutions.push([...currentQueens]);
        return;
      }

      for (let col = 0; col < boardSize; col++) {
        if (isSafe(row, col, currentQueens)) {
          currentQueens[row] = col;
          solve(row + 1);
          currentQueens[row] = -1; // Backtrack
        }
      }
    };

    solve(0);
    return solutions;
  };

  const handleSolve = () => {
    const solutions = solveNQueens(boardSize);
    setSolution(solutions);
    if (solutions.length > 0) {
      setQueens(solutions[0]);
      setCurrentSolutionIndex(0);
      setIsUserPlaying(false);
      setIsGameWon(false);
    } else {
      setQueens(Array(boardSize).fill(-1));
      alert('No solutions found.');
    }
  };

  const handleNextSolution = () => {
    if (solution.length > 0) {
      const nextIndex = (currentSolutionIndex + 1) % solution.length;
      setCurrentSolutionIndex(nextIndex);
      setQueens(solution[nextIndex]);
    }
  };

  const handlePreviousSolution = () => {
    if (solution.length > 0) {
      const prevIndex = (currentSolutionIndex - 1 + solution.length) % solution.length;
      setCurrentSolutionIndex(prevIndex);
      setQueens(solution[prevIndex]);
    }
  };

  const handleUserPlay = () => {
    setIsUserPlaying(true);
    setUserQueens(Array(boardSize).fill(-1));
    setIsGameWon(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isUserPlaying) {
      if (isSafe(row, col, userQueens)) {
        const newUserQueens = [...userQueens];
        newUserQueens[row] = col;
        setUserQueens(newUserQueens);
        if (row === boardSize - 1) {
          if (JSON.stringify(newUserQueens) === JSON.stringify(queens)) {
            setIsGameWon(true);
            alert('You Win!');
          } else {
            alert('Incorrect Solution');
          }
          setIsUserPlaying(false);
        }
      } else {
        alert('Invalid move!');
      }
    }
  };

  const renderBoard = (queensToRender: number[]) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 50px)` }}>
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
                backgroundColor: isDark ? 'lightgray' : 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                cursor: isUserPlaying ? 'pointer' : 'default',
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
      <h1>N-Queens Puzzle</h1>
      <label>
        Board Size:
        <input
          type="number"
          value={boardSize}
          onChange={(e) => setBoardSize(parseInt(e.target.value, 10))}
          min="4"
        />
      </label>
      <button onClick={handleSolve}>Solve</button>
      <button onClick={handleUserPlay}>Play Yourself</button>
      {solution.length > 1 && (
        <div>
          <button onClick={handlePreviousSolution}>Previous Solution</button>
          <span>Solution {currentSolutionIndex + 1} of {solution.length}</span>
          <button onClick={handleNextSolution}>Next Solution</button>
        </div>
      )}

      {isUserPlaying ? renderBoard(userQueens) : renderBoard(queens)}
      {isGameWon && <p>You Won!</p>}
    </div>
  );
};

export default QueenPuzzle;
