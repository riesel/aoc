import { range } from "../../utils"

export default function (rawData: string) {
  const data = rawData
    .split(",")
    .map(Number)
    .sort((a, b) => a - b)
  const possiblePositions = [...range(data[0], data[data.length - 1])]
  const costs = possiblePositions.map(
    (_, index, array) => index + array.slice(0, index).reduce((sum, val) => sum + val, 0)
  )

  const minCost = possiblePositions
    .map(pos => data.reduce((sum, val) => sum + costs[Math.abs(val - pos)], 0))
    .map((cost, pos) => ({ pos, cost }))
    .reduce((min, item) => (item.cost < min.cost ? item : min), { cost: Infinity })

  return minCost
}
