import {buildObject, range} from "../../utils"

type Counters = Record<string, number>

export function mapPolymerTemplate(
  template: string,
  counters: Record<string, number>
) {
  const leftSide = template.slice(0, -1).split("")
  const rightSide = template.slice(1).split("")
  const pairs = leftSide.map((s, i) => s + rightSide[i])
  pairs.forEach((p) => counters[p]++)
  return counters
}

export function processNextPolymer(
  previousCounters: Record<string, number>,
  counters: Record<string, number>,
  rules: Record<string, string>
) {
  Object.entries(previousCounters).forEach(([currentPair, val]) => {
    counters[currentPair[0] + rules[currentPair]] += val
    counters[rules[currentPair] + currentPair[1]] += val
  })
  return counters
}

export function calculateLetters(counters: Counters, borderLetters: string[]): number[] {
  const charCounters = {} as Counters
  Object.entries(counters).forEach(([pair, value]) => {
    charCounters[pair[0]] = (charCounters[pair[0]] || 0) + value
    charCounters[pair[1]] = (charCounters[pair[1]] || 0) + value
  })
  borderLetters.forEach(letter => charCounters[letter]++)
  return Object.values(charCounters).map(value => value / 2)
}

export default function (rawData: string) {
  const [template, ruleBlock]  = rawData.split("\n\n")
  const rules = buildObject<string>(ruleBlock.split("\n").map(row => row.split(" -> ")))
  const initialCounters = buildObject<number>(Object.keys(rules).map(key => [key, 0]))

  const counters = [...range(1, 40)].reduce(
    (counters, _) => processNextPolymer(counters, {...initialCounters}, rules),
    mapPolymerTemplate(template, { ...initialCounters })
  )

  let counts = calculateLetters(counters, [template[0], template.slice(-1)])
  return (Math.max(...counts) - Math.min(...counts))
}
