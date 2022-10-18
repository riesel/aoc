type Coord = { x: number; y: number }
type Line = [Coord, Coord]

export default function (rawData: string) {
  const data = rawData.split("\n").map(
    line =>
      line
        .split(" -> ")
        .map(coord => coord.split(",").map(Number))
        .map(coord => ({ x: coord[0], y: coord[1] })) as Line
  )

  const rowSize = data.reduce((max, val) => Math.max(max, Math.max(val[0].x, val[1].x)), 0) + 1
  const colSize = data.reduce((max, val) => Math.max(max, Math.max(val[0].y, val[1].y)), 0) + 1
  const coverage = Array(rowSize * colSize).fill(0)

  function fillCoverage(line: Line) {
    const dirX = Math.sign(line[1].x - line[0].x)
    const dirY = Math.sign(line[1].y - line[0].y)
    let x = line[0].x
    let y = line[0].y
    while (x !== line[1].x || y !== line[1].y) {
      coverage[y * rowSize + x]++
      x += dirX
      y += dirY
    }
    coverage[y * rowSize + x]++
  }

  data.forEach(fillCoverage)
  return coverage.filter(val => val >= 2).length
}
