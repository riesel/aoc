export default function (rawData: string) {
  const data = rawData.split("\n").map(row => `9${row}9`)
  const rows = data.length + 2
  const cols = data[0].length
  const emptyRow = "".padStart(cols, "9")
  data.push(emptyRow)
  data.unshift(emptyRow)

  const matrix = data.join("").split("").map(Number)
  const lowPoints = matrix.map((val, pos): number => {
    if (pos < cols || pos > (rows + 1) * cols) {
      return 0
    }
    return val < matrix[pos - 1] && val < matrix[pos + 1] && val < matrix[pos - cols] && val < matrix[pos + cols]
      ? 1 + +val
      : 0
  })

  const positions = lowPoints.map((val, pos) => (val ? pos : -1)).filter(pos => pos >= 0)

  const basins = positions.map(pos => findBasin(pos))

  function findBasin(start: number) {
    function addIf(pos: number) {
      if (!lowPoints[pos] && matrix[pos] < 9) {
        lowPoints[pos] = 1
        positions.push(...findBasin(pos))
      }
    }

    const positions: number[] = [start]
    addIf(start - 1)
    addIf(start + 1)
    addIf(start - cols)
    addIf(start + cols)
    return positions.filter(a => a)
  }

  const sizes = basins.map((basin, basinNo) => ({ basinNo, size: basin.length }))
  sizes.sort((a, b) => a.size - b.size)

  const threeLargest = sizes.slice(-3)

  return threeLargest.reduce((product, basin) => product * basin.size, 1)
}
