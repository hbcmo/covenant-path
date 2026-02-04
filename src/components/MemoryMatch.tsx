"use client"
import { useState, useEffect } from "react"

interface MemoryMatchProps {
  pairs: { word: string; match: string }[]
  theme?: string
}

export default function MemoryMatch({ pairs, theme = "Scripture Memory" }: MemoryMatchProps) {
  const [cards, setCards] = useState<{id: number, text: string, type: 'word' | 'match', flipped: boolean, matched: boolean}[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    initializeGame()
  }, [pairs])

  const initializeGame = () => {
    const allCards = pairs.flatMap((pair, index) => [
      { id: index * 2, text: pair.word, type: 'word' as const, flipped: false, matched: false },
      { id: index * 2 + 1, text: pair.match, type: 'match' as const, flipped: false, matched: false }
    ])
    
    // Shuffle cards
    const shuffled = allCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].flipped || cards[id].matched) return
    if (flippedCards.includes(id)) return

    const newCards = [...cards]
    newCards[id].flipped = true
    setCards(newCards)

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      // Check if they match
      const pairIndex = pairs.findIndex(p => 
        (p.word === firstCard.text && p.match === secondCard.text) ||
        (p.match === firstCard.text && p.word === secondCard.text)
      )

      if (pairIndex !== -1) {
        // Match found!
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[first].matched = true
          matchedCards[second].matched = true
          setCards(matchedCards)
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[first].flipped = false
          resetCards[second].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const allMatched = cards.every(card => card.matched)

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-pink-600 mb-2">Memory Match: {theme}</h3>
        <p className="text-gray-600">Match the pairs!</p>
        <p className="text-sm text-gray-500 mt-2">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={card.matched}
            className={`aspect-square p-3 rounded-xl font-semibold text-sm transition-all transform ${
              card.matched
                ? 'bg-green-400 text-white scale-95'
                : card.flipped
                ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg'
                : 'bg-gradient-to-br from-gray-200 to-gray-300 hover:scale-105 hover:shadow-md'
            }`}
          >
            {card.flipped || card.matched ? (
              <span className="text-xs leading-tight">{card.text}</span>
            ) : (
              <span className="text-3xl">❓</span>
            )}
          </button>
        ))}
      </div>

      {allMatched && (
        <div className="text-center p-4 bg-green-100 rounded-lg space-y-2">
          <p className="text-2xl">🎉 Perfect! You matched them all! 🎉</p>
          <p className="text-gray-600">Completed in {moves} moves</p>
          <button
            onClick={initializeGame}
            className="mt-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
