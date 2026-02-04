"use client"
import { useState, useEffect } from "react"
import { getWeekAndDay } from "@/lib/progression"
import { Mode, getStoredMode, setStoredMode } from "@/lib/config"
import WordSearch from "@/components/WordSearch"
import ColoringPage from "@/components/ColoringPage"
import MemoryMatch from "@/components/MemoryMatch"

export default function DailyPage() {
  const [step, setStep] = useState("walk")
  const [selected, setSelected] = useState<string | null>(null)
  const [dayData, setDayData] = useState<any>(null)
  const [weekData, setWeekData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>(getStoredMode())
  const [showCelebration, setShowCelebration] = useState(false)
  const [streak, setStreak] = useState(0)
  const [totalDays, setTotalDays] = useState(0)

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
  }, [])

  // Load completion history and calculate streak
  useEffect(() => {
    if (typeof window !== "undefined") {
      const completedDays = JSON.parse(localStorage.getItem("covenantPath_completed") || "[]")
      setTotalDays(completedDays.length)
      
      // Calculate streak
      const today = new Date().toDateString()
      const sorted = completedDays.sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())
      let currentStreak = 0
      
      for (let i = 0; i < sorted.length; i++) {
        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() - i)
        if (sorted[i] === expectedDate.toDateString()) {
          currentStreak++
        } else {
          break
        }
      }
      setStreak(currentStreak)
    }
  }, [step])

  // Save mode preference to localStorage whenever it changes
  useEffect(() => {
    setStoredMode(mode)
  }, [mode])

  // Get the content for the current mode
  const content = mode === "kids" ? dayData?.kids : dayData?.adult

  // Progress through steps
  const steps = ["walk", "meditation", "play", "response", "closing"]
  const currentStepIndex = steps.indexOf(step)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  // Celebration component
  const Celebration = () => showCelebration ? (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-6xl animate-bounce">🎉</div>
      <div className="absolute top-10 left-10 text-4xl animate-ping">⭐</div>
      <div className="absolute top-10 right-10 text-4xl animate-ping animation-delay-200">⭐</div>
      <div className="absolute bottom-10 left-20 text-4xl animate-ping animation-delay-400">⭐</div>
      <div className="absolute bottom-10 right-20 text-4xl animate-ping animation-delay-600">⭐</div>
    </div>
  ) : null

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
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
        <Celebration />
        {/* Stats Header */}
        <div className="bg-white/80 backdrop-blur p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <div className="font-bold text-orange-600">{streak} Day Streak!</div>
                <div className="text-gray-600 text-xs">Keep it going!</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="font-bold text-yellow-600">{totalDays} Days Completed</div>
                <div className="text-gray-600 text-xs">Amazing progress!</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <div>
                <div className="font-bold text-blue-600">Week {weekData?.week}</div>
                <div className="text-gray-600 text-xs">{weekData?.theme}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500" style={{width: `${progress}%`}} />
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="flex space-x-4 mb-4 justify-center">
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  mode === "adult" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setMode("adult")}
              >
                Adult
              </button>
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  mode === "kids" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setMode("kids")}
              >
                Kids
              </button>
            </div>
            <h1 className="text-4xl font-serif text-gray-900">Day {dayData.day}</h1>
            {weekData && (
              <p className="text-sm text-gray-700">
                Week {weekData.week}: {weekData.theme}
              </p>
            )}
          </div>
        </div>
        <div className="bg-white p-8 space-y-6">
          <p className="text-sm text-gray-600 uppercase tracking-wide">Holy Scripture</p>
          <p className="text-xl italic text-gray-900">"{dayData.scripture.text}"</p>
          <p className="text-sm text-gray-600">{dayData.scripture.reference}</p>
          
          {dayData.confession && mode === "adult" && (
            <div className="mt-6 p-6 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-xs text-amber-700 uppercase tracking-wide mb-2 font-semibold">
                1689 Baptist Confession, Chapter {dayData.confession.chapter}
              </p>
              <p className="text-sm text-gray-900 leading-relaxed">{dayData.confession.text}</p>
            </div>
          )}
          
          {mode === "kids" && content?.story && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="text-sm text-gray-900">{content.story}</p>
            </div>
          )}
          {mode === "adult" && content?.walkCue && (
            <p className="text-sm text-blue-600 italic mt-4">{content.walkCue}</p>
          )}
          <button
            onClick={() => setStep("meditation")}
            className="w-full py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Continue Walking</span>
            <span className="text-2xl">→</span>
          </button>
        </div>
      </main>
    )
  }

  if (step === "meditation") {
    const meditationText = mode === "kids" 
      ? content?.question || "Think about what this means for you today."
      : content?.meditation || "Take a moment to reflect on today's scripture."
    
    return (
      <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-2xl font-serif mb-6 text-gray-900">{mode === "kids" ? "Think About It" : "Meditation"}</h2>
          <p className="text-lg mb-8 text-gray-900">{meditationText}</p>
          <div className="flex justify-between gap-3">
            <button
              onClick={() => setStep("walk")}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep("play")}
              className="flex-1 py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Play Games</span>
              <span className="text-2xl">🎮</span>
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (step === "play") {
    // Randomly select a game based on the day number to keep it consistent per day
    const gameTypes = ['word-search', 'coloring', 'memory'] as const
    const gameType = gameTypes[dayData.day % 3]
    
    const gameInfo = {
      'word-search': { emoji: '🔍', title: 'Word Search' },
      'coloring': { emoji: '🎨', title: 'Coloring Page' },
      'memory': { emoji: '🧠', title: 'Memory Match' }
    }

    return (
      <main className="min-h-screen p-6 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{gameInfo[gameType].emoji}</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{gameInfo[gameType].title}</h2>
            <p className="text-gray-600 text-lg">Have fun reinforcing what you learned!</p>
          </div>

          {/* Game Content */}
          <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow-xl mb-6">
            {gameType === 'word-search' && weekData && (
              <WordSearch 
                words={[
                  'Faith',
                  'God',
                  'Jesus',
                  'Love',
                  'Grace',
                  'Truth',
                  'Hope',
                  'Peace'
                ]}
                theme={weekData.theme}
              />
            )}

            {gameType === 'coloring' && weekData && (
              <ColoringPage 
                title={weekData.theme}
                svgPath=""
              />
            )}

            {gameType === 'memory' && weekData && (
              <MemoryMatch 
                pairs={[
                  { word: 'Faith', match: 'Trust in God' },
                  { word: 'Grace', match: 'Unmerited Favor' },
                  { word: 'Love', match: "God's Nature" },
                  { word: 'Hope', match: 'Future Promise' },
                  { word: 'Truth', match: "God's Word" },
                  { word: 'Mercy', match: 'Compassion' }
                ]}
                theme={weekData.theme}
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep('meditation')}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep('response')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Continue →
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (step === "response") {
    const responses = content?.responses || []
    const prompt = content?.prompt || "How will you respond?"
    
    return (
      <main className="min-h-screen p-6 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <p className="text-lg text-center text-gray-900">{prompt}</p>
          <div className="space-y-3">
            {responses.map((response: string, i: number) => (
              <button
                key={i}
                onClick={() => setSelected(response)}
                className={`w-full text-left p-4 border-2 rounded-xl transition-all duration-200 text-gray-900 font-medium ${
                  selected === response
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-md scale-105"
                    : "border-gray-300 hover:border-orange-300 hover:shadow-md hover:scale-102"
                }`}
              >
                {response}
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep('play')}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              ← Back
            </button>
          <button
            onClick={() => setStep("closing")}
            disabled={!selected}
            className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 ${
              selected
                ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selected && (
              <>
                <span>Continue</span>
                <span className="text-2xl">→</span>
              </>
            )}
            {!selected && <span>Choose a response</span>}
          </button>
          </div>
        </div>
      </main>
    )
  }

  // Closing step
  const closingMessage = mode === "kids"
    ? content?.prayer || "Great job today! See you tomorrow!"
    : "Your word is a lamp to my feet."
  
  return (
    <main className="min-h-screen p-6 flex items-center justify-center bg-gray-100">
      <div className="max-w-md text-center space-y-6">
        <p className="text-2xl font-serif italic text-gray-900">"{closingMessage}"</p>
        <p className="text-sm text-gray-700">Return tomorrow to continue the walk.</p>
        <button
          onClick={() => {
            // Mark day as completed
            if (typeof window !== "undefined") {
              const today = new Date().toDateString()
              const completed = JSON.parse(localStorage.getItem("covenantPath_completed") || "[]")
              if (!completed.includes(today)) {
                completed.push(today)
                localStorage.setItem("covenantPath_completed", JSON.stringify(completed))
                setShowCelebration(true)
                setTimeout(() => setShowCelebration(false), 2000)
              }
            }
            window.location.href = '/'
          }}
          className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-2xl">✓</span>
          <span>Complete Day!</span>
          <span className="text-2xl">🎉</span>
        </button>
        <button
          onClick={() => setStep('response')}
          className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
        >
          ← Back
        </button>
      </div>
    </main>
  )
}
