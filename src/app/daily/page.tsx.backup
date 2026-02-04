"use client"
import { useState, useEffect } from "react"
import { getWeekAndDay } from "@/lib/progression"
import { Mode, getStoredMode, setStoredMode } from "@/lib/config"

export default function DailyPage() {
  const [step, setStep] = useState("walk")
  const [selected, setSelected] = useState<string | null>(null)
  const [dayData, setDayData] = useState<any>(null)
  const [weekData, setWeekData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>(getStoredMode())

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Get current week and day
        let { weekNumber, dayOfWeek } = getWeekAndDay()
        
        // Try to fetch the calculated week, fall back to week 1 if not found
        let response = await fetch(`/data/weeks/week${String(weekNumber).padStart(2, "0")}.json`)
        
        if (!response.ok) {
          console.log(`Week ${weekNumber} not found, falling back to week 1`)
          weekNumber = 1
          dayOfWeek = 1
          response = await fetch(`/data/weeks/week01.json`)
        }
        
        if (!response.ok) {
          throw new Error(`Week data not found`)
        }
        
        const week = await response.json()
        setWeekData(week)
        
        // Find the specific day
        const day = week.days.find((d: any) => d.day === dayOfWeek)
        if (!day) {
          // If day not found, use first day
          const firstDay = week.days[0]
          if (firstDay) {
            setDayData(firstDay)
          } else {
            throw new Error(`No days found in week data`)
          }
        } else {
          setDayData(day)
        }
        
        setError(null)
      } catch (err) {
        console.error("Error loading day data:", err)
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  // Save mode preference to localStorage whenever it changes
  useEffect(() => {
    setStoredMode(mode)
  }, [mode])

  // Get the content for the current mode
  const content = mode === "kids" ? dayData?.kids : dayData?.adult

  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading today's devotional...</p>
        </div>
      </main>
    )
  }

  if (error || !dayData) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4">
          <p className="text-lg text-red-600">{error || "Content not available"}</p>
          <p className="text-sm text-gray-600">Please check back later</p>
        </div>
      </main>
    )
  }

  if (step === "walk") {
                onClick={() => setMode("adult")}
              >
                Adult
              </button>
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  mode === "kids" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
           mode === "kids" && content?.story && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-700">{content.story}</p>
            </div>
          )}
          {mode === "adult" && content?.walkCue && (
            <p className="text-sm text-blue-600 italic">{content.walkCue}</p>
          )}
          <button
            onClick={() => setStep("meditation")}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors
    )
  }

  if (step === "walk") {
    const meditationText = mode === "kids" 
      ? content?.question || "Think about what this means for you today."
      : content?.meditation || "Take a moment to reflect on today's scripture."
    
    return (
      <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
        <div className="max-w-md">
          <h2 className="text-2xl font-serif mb-6">{mode === "kids" ? "Think About It" : "Meditation"}</h2>
          <p className="text-lg mb-8">{meditationText}</p>
          <button
            onClick={() => setStep("response")}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors
              </p>
            )}
          </div>
        </div>
        <div className="bg-white p-8 space-y-6">
          <p classNamecontent?.responses || []
    const prompt = content?.prompt || "How will you respond?"
    
    return (
      <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <p className="text-lg text-center">{prompt}</p>
          <div className="space-y-3">
            {responses.map((response: string, i: number) => (
              <button
                key={i}
                onClick={() => setSelected(response)}
                className={`w-full text-left p-4 border-2 rounded transition-colors ${
                  selected === response
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {response}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("closing")}
            disabled={!selected}
            className={`w-full py-3 px-6 rounded transition-colorse-600 hover:bg-purple-700 text-white rounded"
          >
            Continue
          </button>
        </div>
      </main>
    )
  }

  if (step === "response") {
    const responses = dayData.adult?.responses || []
    const prompt = dayData.adult?.prompt || "How will you respond?"
    
  // Closing step
  const closingMessage = mode === "kids"
    ? content?.prayer || "Great job today! See you tomorrow!"
    : "Your word is a lamp to my feet."
  
  return (
    <main className="min-h-screen p-6 flex items-center justify-center bg-gray-100">
      <div className="max-w-md text-center space-y-6">
        <p className="text-2xl font-serif italic">"{closingMessage}"</p>
        <p className="text-sm text-gray-600">Return tomorrow to continue the walk.</p>
        <button
          onClick={() => {
            setStep("walk")
            setSelected(null)
          }}
          className="w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                {response}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("closing")}
            disabled={!selected}
            className={`w-full py-3 px-6 rounded ${
              selected
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            Continue
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-6 flex items-center justify-center bg-gray-100">
      <div className="max-w-md text-center space-y-6">
        <p className="text-2xl font-serif italic">"Your word is a lamp to my feet."</p>
        <p className="text-sm text-gray-600">Return tomorrow to continue the walk.</p>
        <button
          onClick={() => {
            setStep("walk")
            setSelected(null)
          }}
          className="w-full py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded"
        >
          Done
        </button>
      </div>
    </main>
  )
}
