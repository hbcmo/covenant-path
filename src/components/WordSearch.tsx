"use client"
import { useState, useEffect } from "react"

interface WordSearchProps {
  words: string[]
  gridSize?: number
  theme?: string
}

export default function WordSearch({ words, gridSize = 10, theme = "Scripture" }: WordSearchProps) {
  const [grid, setGrid] = useState<string[][]>([])
  const [found, setFound] = useState<string[]>([])
  const [selecting, setSelecting] = useState<{row: number, col: number}[]>([])
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())

  useEffect(() => {
    generateGrid()
  }, [words])

  const generateGrid = () => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill('')
    )

    // Place words
    words.forEach(word => {
      const cleanWord = word.toUpperCase().replace(/[^A-Z]/g, '')
      let placed = false
      let attempts = 0
      
      while (!placed && attempts < 50) {
        const direction = Math.floor(Math.random() * 3) // 0: horizontal, 1: vertical, 2: diagonal
        const row = Math.floor(Math.random() * gridSize)
        const col = Math.floor(Math.random() * gridSize)
        
        if (canPlaceWord(newGrid, cleanWord, row, col, direction)) {
          placeWord(newGrid, cleanWord, row, col, direction)
          placed = true
        }
        attempts++
      }
    })

    // Fill remaining with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
        }
      }
    }

    setGrid(newGrid)
  }

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
    if (direction === 0) { // horizontal
      if (col + word.length > gridSize) return false
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false
      }
    } else if (direction === 1) { // vertical
      if (row + word.length > gridSize) return false
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false
      }
    } else { // diagonal
      if (row + word.length > gridSize || col + word.length > gridSize) return false
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) return false
      }
    }
    return true
  }

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    for (let i = 0; i < word.length; i++) {
      if (direction === 0) grid[row][col + i] = word[i]
      else if (direction === 1) grid[row + i][col] = word[i]
      else grid[row + i][col + i] = word[i]
    }
  }

  const handleCellClick = (row: number, col: number) => {
    const newSelecting = [...selecting, { row, col }]
    setSelecting(newSelecting)
    
    // Check if we found a word
    const selectedWord = newSelecting.map(cell => grid[cell.row][cell.col]).join('')
    const matchedWord = words.find(w => w.toUpperCase().replace(/[^A-Z]/g, '') === selectedWord)
    
    if (matchedWord && !found.includes(matchedWord)) {
      setFound([...found, matchedWord])
      const newSelected = new Set(selectedCells)
      newSelecting.forEach(cell => newSelected.add(`${cell.row}-${cell.col}`))
      setSelectedCells(newSelected)
      setSelecting([])
    }
  }

  const resetSelection = () => {
    setSelecting([])
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-purple-600 mb-2">Word Search: {theme}</h3>
        <p className="text-gray-600">Find these words in the grid!</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {words.map((word, i) => (
          <div
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
              found.includes(word)
                ? 'bg-green-500 text-white line-through'
                : 'bg-purple-100 text-purple-700'
            }`}
          >
            {word}
          </div>
        ))}
      </div>

      <div 
        className="inline-block bg-white p-4 rounded-xl shadow-lg"
        onMouseLeave={resetSelection}
      >
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onMouseDown={() => handleCellClick(i, j)}
                onMouseEnter={() => selecting.length > 0 && handleCellClick(i, j)}
                className={`w-8 h-8 sm:w-10 sm:h-10 font-bold text-sm sm:text-base rounded transition-all ${
                  selectedCells.has(`${i}-${j}`)
                    ? 'bg-green-400 text-white'
                    : selecting.some(s => s.row === i && s.col === j)
                    ? 'bg-purple-300 text-white'
                    : 'bg-gray-100 hover:bg-purple-100 text-gray-900'
                }`}
              >
                {cell}
              </button>
            ))
          )}
        </div>
      </div>

      {found.length === words.length && (
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <p className="text-2xl">🎉 Amazing! You found all the words! 🎉</p>
        </div>
      )}
    </div>
  )
}
