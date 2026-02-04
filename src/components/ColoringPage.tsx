"use client"
import { useState } from "react"

interface ColoringPageProps {
  title: string
  svgPath: string
}

export default function ColoringPage({ title, svgPath }: ColoringPageProps) {
  const [colors, setColors] = useState<{[key: string]: string}>({})
  const [currentColor, setCurrentColor] = useState("#FF6B6B")

  const colorPalette = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#FFA07A", // Orange
    "#98D8C8", // Mint
    "#F7DC6F", // Yellow
    "#BB8FCE", // Purple
    "#85C1E2", // Sky Blue
    "#F8B4D9", // Pink
    "#95E1D3", // Aqua
  ]

  const handleAreaClick = (areaId: string) => {
    setColors({ ...colors, [areaId]: currentColor })
  }

  const resetColors = () => {
    setColors({})
  }

  // Simple SVG shapes for a cross with a heart
  const renderSimpleSVG = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Cross */}
      <rect 
        x="85" y="20" width="30" height="160" 
        fill={colors['cross-vertical'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('cross-vertical')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      <rect 
        x="50" y="70" width="100" height="30" 
        fill={colors['cross-horizontal'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('cross-horizontal')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      {/* Heart at center */}
      <path 
        d="M 100 95 
           C 100 88, 94 82, 87 82
           C 80 82, 75 88, 75 95
           C 75 105, 85 115, 100 125
           C 115 115, 125 105, 125 95
           C 125 88, 120 82, 113 82
           C 106 82, 100 88, 100 95 Z"
        fill={colors['heart'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('heart')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      {/* Decorative elements */}
      <circle cx="100" cy="40" r="8" 
        fill={colors['circle-1'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('circle-1')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      <circle cx="60" cy="85" r="6" 
        fill={colors['circle-2'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('circle-2')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      <circle cx="140" cy="85" r="6" 
        fill={colors['circle-3'] || '#E0E0E0'}
        stroke="#333" strokeWidth="2"
        onClick={() => handleAreaClick('circle-3')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
    </svg>
  )

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-2">Coloring Page: {title}</h3>
        <p className="text-gray-600">Click the colors below, then click parts of the image to color!</p>
      </div>

      {/* Color Palette */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {colorPalette.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${
              currentColor === color ? 'border-gray-800 scale-110' : 'border-white'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Canvas */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {renderSimpleSVG()}
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetColors}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          Reset Colors
        </button>
      </div>

      {Object.keys(colors).length >= 6 && (
        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <p className="text-xl">🎨 Beautiful artwork! 🎨</p>
        </div>
      )}
    </div>
  )
}
