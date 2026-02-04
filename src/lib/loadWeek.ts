import { Week } from "@/types/week"

export async function loadWeek(weekNumber: number): Promise<Week> {
  // This function runs client-side only due to "use client" in daily/page.tsx
  const path = `/data/weeks/week${String(weekNumber).padStart(2, "0")}.json`
  
  try {
    const res = await fetch(path)

    if (!res.ok) {
      throw new Error(`Failed to fetch week data: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error loading week:", error)
    throw error
  }
}
