import { range } from "../../utils"

export default function (rawData: string) {
  const [data, part2] = rawData.split("\n\n").map(row => row.split("\n"))
  const points = data.map(point => point.split(",").map(Number))
  const folds = (part2.map(row => row.match(/(x|y)=(\d+)/)?.slice(1)) as string[][]).map(([dir, val]) => [
    Number(val),
    dir === "x" ? 0 : 1,
  ])

  const funcs = folds.map(([at, dir]) => (p: number[]) => {
    const folded = at - Math.abs(p[dir] - at)
    return [dir ? p[0] : folded, dir ? folded : p[1]]
  })

  const result = points
    .map(p => funcs.reduce((last, func) => func(last), p))
    .sort((p1, p2) => p1[1] - p2[1] || p1[0] - p2[0])
    .filter((p, index, list) => index === 0 || p.join(",") !== list[index - 1].join(","))

  const row = "".padStart(
    Math.max.apply(
      Math,
      result.map(p => p[0])
    ),
    "."
  )
  const matrix = [
    ...range(
      0,
      Math.max.apply(
        Math,
        result.map(p => p[1])
      )
    ),
  ].map(() => row.split(""))

  result.forEach(p => {
    matrix[p[1]] = matrix[p[1]] || ([] as string[])
    matrix[p[1]][p[0]] = "#"
  })
  return (
    "\n" +
    matrix
      .map(row => row.join(""))
      .join("\n")
      .replace(/\./g, " ")
  )
}
