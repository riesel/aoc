import { parseIntegers, sort, splitBlocks, sum } from "../../utils"

export default function (rawData: string) {
  return sum(
    splitBlocks(rawData)
      .map(elve => sum(parseIntegers(elve, "\n")))
      .sort(sort.numbers)
      .splice(-3)
  )
}
