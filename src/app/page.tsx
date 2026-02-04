"use client"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("covenantPath_startDate")
      setShowResetConfirm(false)
      alert("Journey reset! Your next visit will start from Day 1.")
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-serif mb-4">
        Covenant & Crown
      </h1>

      <p className="mb-6 max-w-md text-gray-600">
        A year-long pilgrimage through the doctrines of grace,
        grounded in Scripture and the 1689 Confession.
      </p>

      <Link
        href="/daily"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Begin Today
      </Link>

      <div className="mt-12">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Reset Journey
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Are you sure? This will restart from Day 1.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
