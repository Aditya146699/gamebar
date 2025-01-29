"use client";
import { useState } from 'react';

type SquareValue = 'X' | 'O' | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null)); // Represents the 3x3 board
  const [isXNext, setIsXNext] = useState<boolean>(true); // Tracks whose turn it is
  const [showModal, setShowModal] = useState<boolean>(false); // Controls modal visibility
  const [modalMessage, setModalMessage] = useState<string>(''); // Message to display in the modal

  // Determine the winner
  const calculateWinner = (squares: SquareValue[]): SquareValue => {
    const winningLines = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return 'X' or 'O' as the winner
      }
    }
    return null; // No winner yet
  };

  // Handle a square click
  const handleClick = (index: number): void => {
    if (board[index] || calculateWinner(board)) {
      return; // Do nothing if the square is already filled or the game is over
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    // Check for a winner or draw after the move
    const winner = calculateWinner(newBoard);
    if (winner) {
      setModalMessage(`Winner: ${winner}`);
      setShowModal(true);
    } else if (newBoard.every((square) => square)) {
      setModalMessage('Draw!');
      setShowModal(true);
    }

    setIsXNext(!isXNext);
  };

  // Reset the game
  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowModal(false); // Hide the modal when resetting the game
  };

  // Close the modal
  const closeModal = (): void => {
    setShowModal(false);
  };

  // Check for a winner or a draw
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <h1 className="text-4xl font-bold mb-4">Tic-Tac-Toe</h1> */}
      <div className="text-2xl mb-4">{status}</div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-24 h-24 btn btn-primary text-6xl"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-5"
        onClick={resetGame}
      >
        Reset Game
      </button>

      {/* Winner/Draw Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box p-8 rounded-lg shadow-lg text-center">
            <h2 className="font-bold text-lg">{modalMessage}</h2>
            <button
              className="px-6 py-2 m-5 btn btn-accent"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;