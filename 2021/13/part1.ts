import { range } from "../../utils"

export default function (rawData: string) {
  const [data, part2] = rawData.split("\n\n").map(row => row.split("\n"))
  const points = data.map(point => point.split(",").map(Number))
  const folds = (part2.map(row => row.match(/(x|y)=(\d+)/)?.slice(1)) as string[][]).map(([dir, val]) => [dir === "x" ? 0 : 1, Number(val)])

  function fold(at: number, dir: number) {
    return [...range(0, at - 1)].map((i) => {
      const relevantPoints = points.filter(p => p[dir] === i || p[dir] === i + (at - i) * 2).map(p => p[1 - dir])
      return relevantPoints.sort((a, b) => a - b).filter((val, index, arr) => index === 0 || val !== arr[index - 1]).length
    }).reduce((sum, val) => sum + val)
  }

  return fold(folds[0][1], folds[0][0])
}
