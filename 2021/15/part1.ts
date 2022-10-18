export default function (rawData: string) {
  const matrix = rawData.split("\n").map(row => row.split("").map(Number))
  const cols = matrix[0].length
  const cumulated: number[] = []
  matrix.flat().forEach((cost, index) => {
    const left = index % cols ? cumulated[index - 1] : Infinity
    const above = index >= cols ? cumulated[index - cols] : Infinity
    cumulated[index] = index ? cost + Math.min(left, above) : 0
  })

  return cumulated.pop()
}
