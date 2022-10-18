import {buildObject, range} from "../../utils"

export default function (rawData: string) {
  const [template, ruleBlock] = rawData.split("\n\n")
  const rules = buildObject(ruleBlock.split("\n").map(row => row.split(" -> ")))

  function step(polymer: string) {
    return polymer.split("").map((ch, i, arr) => i ? rules[arr[i - 1] + ch] + ch : ch).join("")
  }

  function countLetters(total: Record<string, number>, letter: string) {
    return { ...total, [letter]: (total[letter] || 0) + 1 }
  }

  const result = [...range(0, 9)]
    .reduce(step, template)
    .split('')
    .reduce(countLetters, {} as Record<string, number>)

  return Math.max(...Object.values(result)) - Math.min(...Object.values(result))
}
