import { parseIntegers, splitBlocks, sum } from "../../utils"

export default function (rawData: string) {
  const amounts = splitBlocks(rawData).map(elve => sum(parseIntegers(elve, "\n")))
  return Math.max(...amounts)
}
