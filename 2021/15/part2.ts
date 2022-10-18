import { range } from "../../utils"

export default function (rawData: string) {
  const matrix = rawData.split("\n").map(row => row.split("").map(Number))
  const cols = matrix[0].length
  const rows = matrix.length
  const totalCols = cols * 5

  function getCost(index: number) {
    const x = index % totalCols
    const y = Math.floor(index / totalCols)
    const newVal = matrix[y % rows][x % cols] + Math.floor(x / cols) + Math.floor(y / rows)
    return ((newVal - 1) % 9) + 1
  }

  const queue = [...range(1, rows * 5 * totalCols - 1)].reduce((queue, index) => {
    const left = index % totalCols ? queue[queue.length - 1] : Infinity
    const above = queue.shift() as number
    return [...queue, getCost(index) + Math.min(left, above)]
  }, [...range(0, totalCols - 2)].fill(Infinity).concat(0))

  return queue.pop()
}
