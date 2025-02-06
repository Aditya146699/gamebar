"use client";
import { useState, useEffect } from 'react';

const programmingLanguages = [
  "Python",
  "Java",
  "JavaScript",
  "Cplus",
  "Csharp",
  "Go",
  "Ruby",
  "Swift",
  "Kotlin",
  "Rust",
  "TypeScript",
  "PHP",
  "Dart",
  "Perl",
  "Scala",
  "ObjectiveC",
  "Lua",
  "Julia",
  "Elixir",
  "Erlang",
  "Clojure",
  "Haskell",
  "OCaml",
  "Scheme",
  "Common Lisp",
  "Racket",
  "Ada",
  "Nim",
  "Crystal",
  "Zig",
  "HTML",
  "CSS",
  "SQL",
  "MATLAB",
  "Assembly",
  "Bash",
  "PowerShell",
  "Tcl",
  "Verilog",
  "VHDL",
  "Solidity",
  "G-code",
  "XSLT",
  "Scratch",
  "Blockly",
  "Logo",
  "BASIC",
  "Pascal",
  "Brainfuck",
  "Whitespace",
  "Malbolge",
  "INTERCAL",
  "Piet",
  "LOLCODE",
  "Shakespeare",
  "Befunge",
  "Chef",
  "COBOL",
  "Fortran",
  "ALGOL",
  "Smalltalk",
  "Prolog",
  "Lisp",
  "Carbon"
];
const maxAttempts = 6;

const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(maxAttempts);
  const [score, setScore] = useState<number>(0);

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  // Get a random programming language
  const getRandomWord = (): string => {
    return programmingLanguages[Math.floor(Math.random() * programmingLanguages.length)];
  };

  // Get the masked word (e.g., _ _ _ _ _)
  const getMaskedWord = (): string => {
    return selectedWord
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  };

  // Handle letter guess
  const handleLetterGuess = (letter: string): void => {
    if (guessedLetters.includes(letter)) return; // Ignore duplicate guesses

    setGuessedLetters([...guessedLetters, letter]);

    if (!selectedWord.includes(letter)) {
      setAttemptsLeft((prev) => prev - 1);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (/^[a-zA-Z]$/.test(event.key)) {
        handleLetterGuess(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [guessedLetters]);

  // Check if the player has won
  const hasWon = selectedWord.split('').every((letter) => guessedLetters.includes(letter));

  // Check if the player has lost
  const hasLost = attemptsLeft === 0;

  // Reset the game
  const resetGame = (): void => {
    setSelectedWord(getRandomWord());
    setGuessedLetters([]);
    setAttemptsLeft(maxAttempts);
  };

  // Update score when the player wins
  useEffect(() => {
    if (hasWon) {
      setScore((prev) => prev + 1);
    }
  }, [hasWon]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-4">
      {/* <h1 className="text-4xl md:text-6xl font-bold mb-8 text-shadow-lg animate-pulse text-center">
        Hangman
      </h1> */}
      <div className="text-2xl md:text-3xl mb-6 font-semibold text-center">
        Score: {score}
      </div>
      <div className="text-2xl md:text-3xl mb-6 font-semibold text-center">
        {hasWon ? 'Congratulations! You won! 🎉' : hasLost ? 'Game Over! You lost. 😢' : getMaskedWord()}
      </div>
      {!hasWon && !hasLost && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <button
              key={letter}
              className={`btn btn-outline btn-primary ${
                guessedLetters.includes(letter) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handleLetterGuess(letter)}
              disabled={guessedLetters.includes(letter)}
            >
              <span className="text-xl md:text-2xl">{letter}</span>
            </button>
          ))}
        </div>
      )}
      <div className="text-2xl md:text-3xl mb-6 font-semibold text-center">
        Attempts Left: {attemptsLeft}
      </div>
      {/* Hangman Drawing */}
      <div className="mb-8">
        <pre className="text-xl md:text-2xl font-mono">
          {`
            _______
           |       |
           ${attemptsLeft < 6 ? 'O' : ' '}       |
          ${attemptsLeft < 4 ? '/' : ' '}${attemptsLeft < 5 ? '|' : ' '}${attemptsLeft < 3 ? '\\' : ' '}      |
          ${attemptsLeft < 2 ? '/' : ' '} ${attemptsLeft < 1 ? '\\' : ' '}     |
                   |
           ________|
          `}
        </pre>
      </div>
      {(hasWon || hasLost) && (
        <button
          className="px-6 py-2 md:px-8 md:py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Hangman;
