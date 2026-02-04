import { getStartDate } from "./config"

export function getDayIndex(today = new Date()) {
  const msPerDay = 1000 * 60 * 60 * 24
  const startDate = getStartDate()
  const diff = today.getTime() - startDate.getTime()

  return Math.floor(diff / msPerDay)
}

export function getWeekAndDay(today = new Date()) {
  const dayIndex = Math.max(0, getDayIndex(today))

  const weekNumber = Math.floor(dayIndex / 7) + 1
  const dayOfWeek = (dayIndex % 7) + 1

  return { weekNumber, dayOfWeek }
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
