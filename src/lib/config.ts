export type Mode = "adult" | "kids"
export const DEFAULT_MODE: Mode = "adult"

const START_DATE_KEY = "covenantPath_startDate"

export function getStartDate(): Date {
  if (typeof window === "undefined") return new Date()
  
  const stored = localStorage.getItem(START_DATE_KEY)
  if (stored) {
    return new Date(stored)
  }
  
  // First time - store today as the start date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  localStorage.setItem(START_DATE_KEY, today.toISOString())
  return today
}

export function getStoredMode(): Mode {
  if (typeof window === "undefined") return DEFAULT_MODE
  return (localStorage.getItem("mode") as Mode) || DEFAULT_MODE
}

export function setStoredMode(mode: Mode) {
  if (typeof window === "undefined") return
  localStorage.setItem("mode", mode)
}
