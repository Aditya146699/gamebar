"use client";
import { useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;

const TwoPlayerRockPaperScissors = () => {
  const [player1Choice, setPlayer1Choice] = useState<Choice>(null);
  const [aiChoice, setAIChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<{ player1: number; ai: number }>({
    player1: 0,
    ai: 0,
  });

  // Determine the AI's choice
  const getAIChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  // Determine the game result
  const determineWinner = (player1: Choice, ai: Choice): string => {
    if (player1 === ai) return "It's a tie! 🤝";
    if (
      (player1 === 'rock' && ai === 'scissors') ||
      (player1 === 'paper' && ai === 'rock') ||
      (player1 === 'scissors' && ai === 'paper')
    ) {
      setScore((prev) => ({ ...prev, player1: prev.player1 + 1 }));
      return 'You win! 🎉';
    }
    setScore((prev) => ({ ...prev, ai: prev.ai + 1 }));
    return 'AI wins! 🎉';
  };

  // Handle player choice
  const handlePlayerChoice = (choice: Choice): void => {
    const aiChoice = getAIChoice();
    setPlayer1Choice(choice);
    setAIChoice(aiChoice);
    setResult(determineWinner(choice, aiChoice));
  };

  // Reset the game
  const resetGame = (): void => {
    setPlayer1Choice(null);
    setAIChoice(null);
    setResult('');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      {/* <h1 className="text-4xl md:text-6xl font-bold mb-8 text-shadow-lg animate-pulse text-center">
        Rock Paper Scissors
      </h1> */}
      <div className="text-2xl md:text-3xl mb-6 font-semibold text-center">
        Score: <span className="text-yellow-400">You</span> {score.player1} - {score.ai}{' '}
        <span className="text-yellow-400">AI</span>
      </div>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 mb-8">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">You</h2>
          <div className="flex space-x-4 md:space-x-6">
            {(['rock', 'paper', 'scissors'] as Choice[]).map((choice) => (
              <button
                key={choice}
                className={`w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full shadow-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-110 ${
                  player1Choice === choice ? 'bg-white/40 scale-110' : ''
                }`}
                onClick={() => handlePlayerChoice(choice)}
              >
                <span className="text-4xl md:text-5xl">
                  {choice === 'rock' ? '🌑' : choice === 'paper' ? '📄' : '✂️'}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* AI Bot */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">AI</h2>
          <div className="flex space-x-4 md:space-x-6">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full shadow-lg flex justify-center items-center">
              <span className="text-4xl md:text-5xl">
                {aiChoice === 'rock' ? '🌑' : aiChoice === 'paper' ? '📄' : aiChoice === 'scissors' ? '✂️' : '🤖'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {result && (
        <div className="text-center animate-fade-in">
          <div className="text-3xl md:text-4xl font-bold mb-6">{result}</div>
          <button
            className="px-6 py-2 md:px-8 md:py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoPlayerRockPaperScissors;