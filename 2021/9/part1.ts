export default function (rawData: string) {
  const data = rawData.split("\n").map(row => `9${row}9`)
  const rows = data.length + 2
  const cols = data[0].length
  const emptyRow = "".padStart(cols, "9")
  data.push(emptyRow)
  data.unshift(emptyRow)

  const matrix = data.join("").split("")
  const lowPoints = matrix.map((val, pos): number => {
    if (pos < cols || pos > (rows + 1) * cols) {
      return 0
    }
    return val < matrix[pos - 1] && val < matrix[pos + 1] && val < matrix[pos - cols] && val < matrix[pos + cols]
      ? 1 + +val
      : 0
  })

  return lowPoints.reduce((sum, val) => sum + val, 0)
}
