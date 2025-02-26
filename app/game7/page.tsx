"use client";
import React, { useState, useEffect } from 'react';
import { makeMove, isWin, shufflePuzzle, initialPuzzleState, PuzzleState } from './puzzleLogic';
import styles from './PuzzleBoard.module.css';  // Import CSS module

const PuzzleBoard: React.FC = () => {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>(initialPuzzleState);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);  // New state for game win

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isTimerRunning && !gameWon) {
      timerInterval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
        () => clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, gameWon]);

  const handleTileClick = (index: number) => {
    const newPuzzleState = makeMove(puzzleState, index);
    if (newPuzzleState !== puzzleState) {
      setPuzzleState(newPuzzleState);
      setMoves((prev) => prev + 1);
    }
  };

  const handleShuffle = () => {
    setPuzzleState(shufflePuzzle(puzzleState));
    setMoves(0);
    setSeconds(0);
    setIsTimerRunning(true);
    setGameWon(false); // Reset game win state when shuffling
  };

  const handleReset = () => {
    setPuzzleState(initialPuzzleState);
    setMoves(0);
    setSeconds(0);
    setIsTimerRunning(false);
    setGameWon(false); // Reset game win state when resetting
  };

  const handleWin = () => {
    setGameWon(true);
    setIsTimerRunning(false); // Stop the timer when the game is won
  };

  const renderTile = (value: number, index: number) => {
    return (
      <div
        key={index}
        className={`${styles.tile} ${value === 0 ? styles.empty : ''}`}
        onClick={() => value !== 0 && handleTileClick(index)}
      >
        {value !== 0 ? value : ''}
      </div>
    );
  };

  useEffect(() => {
    if (isWin(puzzleState)) {
      handleWin(); // Handle win when puzzle is solved
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
        {gameWon && <p>You win! 🎉</p>}
      </div>

      <div className={styles.controls}>
        <button onClick={handleShuffle}>Start Game</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {gameWon && (
        <div className={styles.winScreen}>
          <p>Congratulations! You solved the puzzle!</p>
          <button onClick={handleReset}>Play Again</button>
        </div>
      )}
    </div>
    </main>    
  );
};

export default PuzzleBoard;
