"use client";
import { useState, useEffect } from 'react';

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);

  // Initialize the game
  useEffect(() => {
    resetGame();
  }, []);

  // Create a shuffled deck of cards
  const createDeck = (): Card[] => {
    const values = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const deck = [...values, ...values].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    return shuffle(deck);
  };

  // Shuffle the deck using Fisher-Yates algorithm
  const shuffle = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Handle card click
  const handleCardClick = (index: number): void => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return; // Do nothing if two cards are already flipped or the card is already matched
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
      setMoves((prev) => prev + 1);
    }
  };

  // Check if the two flipped cards match
  const checkForMatch = (flippedCards: number[]): void => {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.value === secondCard.value) {
      const newCards = [...cards];
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      setCards(newCards);

      if (newCards.every((card) => card.isMatched)) {
        setIsGameComplete(true);
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
      }, 1000);
    }

    setFlippedCards([]);
  };

  // Reset the game
  const resetGame = (): void => {
    const newDeck = createDeck();
    setCards(newDeck);
    setFlippedCards([]);
    setMoves(0);
    setIsGameComplete(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-4">Memory Card Game</h1> */}
      <div className="text-2xl mb-4">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-24 h-24 max-[400px]:w-20 max-[400px]:h-20 btn btn-primary flex justify-center items-center text-6xl  ${
              card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            {card.isFlipped || card.isMatched ? card.value : '🃏'}
          </div>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-6 px-6 py-2"
        onClick={resetGame}
      >
        Reset Game
      </button>

      {/* Game Complete Modal */}
      {isGameComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="text-xl mb-4">You completed the game in {moves} moves!</p>
            <button
              className="px-6 py-2 m-5 btn btn-accent"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;