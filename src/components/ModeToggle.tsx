"use client"
import { useState, useEffect } from "react"
import { Mode, getStoredMode, setStoredMode } from "@/lib/config"

export default function ModeToggle() {
  const [mode, setMode] = useState<Mode>(getStoredMode())

  useEffect(() => {
    setStoredMode(mode)
  }, [mode])

  return (
    <div className="flex space-x-4 mb-4 justify-center">
      <button
        className={`px-4 py-2 rounded ${
          mode === "adult" ? "bg-black text-white" : "bg-gray-200"
        }`}
        onClick={() => setMode("adult")}
      >
        Adult
      </button>
      <button
        className={`px-4 py-2 rounded ${
          mode === "kids" ? "bg-black text-white" : "bg-gray-200"
        }`}
        onClick={() => setMode("kids")}
      >
        Kids
      </button>
    </div>
  )
}
