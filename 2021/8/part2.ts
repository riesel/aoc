import { range } from "../../utils"

const segmentCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

function patternFor(num: number, signal: string[]) {
  return signal.filter(pattern => pattern.length === segmentCounts[num])
}

function contains(digit: string, pattern: string) {
  const a = digit.split("")
  const b = pattern.split("")
  return b.every(c => a.includes(c))
}

export default function (rawData: string) {
  const data = rawData
    .split("\n")
    .map(row => row.split(" | ").map(part => part.split(" ").map(p => p.split("").sort().join(""))))

  const result = data.map(([signal, output]) => {
    const candidates = [...range(0, 9)].map(num => patternFor(num, signal))
    const digits: string[] = []

    digits[1] = candidates[1][0]
    digits[4] = candidates[4][0]
    digits[7] = candidates[7][0]
    digits[8] = candidates[8][0]
    digits[9] = candidates[9].find(g => contains(g, digits[4])) as string
    digits[0] = candidates[0].find(g => g !== digits[9] && contains(g, digits[7])) as string
    digits[6] = candidates[6].find(g => g !== digits[9] && g !== digits[0]) as string
    digits[3] = candidates[3].find(g => contains(g, digits[7])) as string
    const d = digits[8]
      .split("")
      .filter(g => !digits[0].includes(g))
      .join("")
    const b = digits[4]
      .split("")
      .filter(g => g !== d && !digits[1].includes(g))
      .join("")
    digits[5] = candidates[5].find(g => g !== digits[3] && contains(g, b)) as string
    digits[2] = candidates[2].find(g => g !== digits[3] && g !== digits[5]) as string

    return parseInt(output.map(digit => digits.findIndex(d => d === digit)).join(""))
  })

  return result.reduce((sum, val) => sum + val)
}
