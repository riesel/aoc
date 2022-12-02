import { splitLines, sum } from "../../utils"

const scoreMap = {
  "A X": 3 + 1, "A Y": 6 + 2, "A Z": 0 + 3,
  "B X": 0 + 1, "B Y": 3 + 2, "B Z": 6 + 3,
  "C X": 6 + 1, "C Y": 0 + 2, "C Z": 3 + 3,
}

type Variant = keyof typeof scoreMap

export default function (rawData: string) {
  const scores = splitLines(rawData).map(line => scoreMap[line as Variant])
  return sum(scores)
}
