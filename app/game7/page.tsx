"use client";
import React, { useState, useEffect } from 'react';
import styles from './PuzzleBoard.module.css';

type PuzzleState = number[];

const initialPuzzleState: PuzzleState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const shufflePuzzle = (puzzle: PuzzleState): PuzzleState => {
  let newPuzzle = [...puzzle];
  do {
    for (let i = newPuzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPuzzle[i], newPuzzle[j]] = [newPuzzle[j], newPuzzle[i]];
    }
  } while (!isSolvable(newPuzzle));
  return newPuzzle;
};

const isSolvable = (puzzle: PuzzleState): boolean => {
  let inversions = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] && puzzle[j] && puzzle[i] > puzzle[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

const findEmptyTile = (puzzle: PuzzleState): number => {
  return puzzle.indexOf(0);
};

const makeMove = (puzzle: PuzzleState, index: number): PuzzleState => {
  const emptyIndex = findEmptyTile(puzzle);
  const size = Math.sqrt(puzzle.length);
  const row = Math.floor(index / size);
  const col = index % size;
  const emptyRow = Math.floor(emptyIndex / size);
  const emptyCol = emptyIndex % size;

  if (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  ) {
    const newPuzzle = [...puzzle];
    [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
    return newPuzzle;
  }
  return puzzle;
};

const isWin = (puzzle: PuzzleState): boolean => {
  for (let i = 0; i < puzzle.length - 1; i++) {
    if (puzzle[i] !== i + 1) {
      return false;
    }
  }
  return puzzle[puzzle.length - 1] === 0;
};

const PuzzleBoard: React.FC = () => {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(initialPuzzleState);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | undefined;

    if (isTimerRunning && !gameWon) {
      timerInterval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isTimerRunning, gameWon]);

  const handleTileClick = (index: number) => {
    const newPuzzleState = makeMove(puzzleState, index);
    if (newPuzzleState !== puzzleState) {
      setPuzzleState(newPuzzleState);
      setMoves((prev) => prev + 1);
    }
  };

  const handleShuffle = () => {
    setPuzzleState(shufflePuzzle(initialPuzzleState));
    setMoves(0);
    setSeconds(0);
    setIsTimerRunning(true);
    setGameWon(false);
  };

  const handleReset = () => {
    setPuzzleState(initialPuzzleState);
    setMoves(0);
    setSeconds(0);
    setIsTimerRunning(false);
    setGameWon(false);
  };

  const handleWin = () => {
    setGameWon(true);
    setIsTimerRunning(false);
  };

  const renderTile = (value: number, index: number) => {
    return (
      <div
        key={index}
        className={`${styles.tile} ${value === 0 ? styles.empty : ''}`}
        onClick={() => { if (value !== 0) handleTileClick(index); }}
      >
        {value !== 0 ? value : ''}
      </div>
    );
  };

  useEffect(() => {
    if (isWin(puzzleState)) {
      handleWin();
    }
  }, [puzzleState]);

  return (
    <main className={styles.main}>
      <div className={styles.puzzleContainer}>
        <div className={styles.board}>
          {puzzleState.map((value, index) => renderTile(value, index))}
        </div>

        <div className={styles.info}>
          <p>Moves: {moves}</p>
          <p>Time: {seconds}s</p>
          {gameWon && <p>You win! 🎉<button onClick={handleShuffle}>Play Again</button></p>}
        </div>

        <div className={styles.controls}>
          <button onClick={handleShuffle}>Start Game</button>
        </div>
      </div>
    </main>
  );
};

export default PuzzleBoard;
