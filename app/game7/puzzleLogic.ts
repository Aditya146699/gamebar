export type PuzzleState = number[];

export const initialPuzzleState: PuzzleState = [
  1, 2, 3,
  4, 5, 6,
  7, 8, 0,
];

// Get the index of the blank tile (represented by 0)
const getBlankIndex = (state: PuzzleState): number => {
  return state.indexOf(0);
};

// Swap two tiles in the puzzle
const swap = (state: PuzzleState, i: number, j: number): PuzzleState => {
  const newState = [...state];
  [newState[i], newState[j]] = [newState[j], newState[i]];
  return newState;
};

// Check if a move is valid (up, down, left, right)
const isValidMove = (state: PuzzleState, index: number): boolean => {
  const blankIndex = getBlankIndex(state);
  const validMoves = [
    blankIndex - 3, // Move up
    blankIndex + 3, // Move down
    blankIndex - 1, // Move left
    blankIndex + 1, // Move right
  ];

  return validMoves.includes(index) && index >= 0 && index < 9;
};

// Make a move in the puzzle
export const makeMove = (state: PuzzleState, index: number): PuzzleState => {
  const blankIndex = getBlankIndex(state);
  if (isValidMove(state, index)) {
    return swap(state, blankIndex, index);
  }
  return state;
};

// Check if the puzzle is solved
export const isWin = (state: PuzzleState): boolean => {
  return state.every((value, index) => value === index);
};

// Shuffle the puzzle state randomly
export const shufflePuzzle = (state: PuzzleState): PuzzleState => {
  let newState = [...state];
  let blankIndex = getBlankIndex(newState);

  // Perform 100 random moves to shuffle the puzzle
  for (let i = 0; i < 100; i++) {
    const validMoves = [
      blankIndex - 3, // Move up
      blankIndex + 3, // Move down
      blankIndex - 1, // Move left
      blankIndex + 1, // Move right
    ].filter((index) => index >= 0 && index < 9);

    const randomIndex = validMoves[Math.floor(Math.random() * validMoves.length)];
    newState = swap(newState, blankIndex, randomIndex);
    blankIndex = randomIndex;
  }

  return newState;
};
