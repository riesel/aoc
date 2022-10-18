const segmentCounts = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

function isA(output: string[], signal: string[], num: number) {
  return output.filter(digit => digit.length === segmentCounts[num]).length
}

export default function (rawData: string) {
  const data = rawData.split("\n").map(row => row.split(" | ").map(part => part.split(" ")))

  const result = data
    .map(([signal, output]) => {
      return [isA(output, signal, 1), isA(output, signal, 4), isA(output, signal, 7), isA(output, signal, 8)]
    })
    .reduce((sums, values) => {
      return [sums[0] + values[0], sums[1] + values[1], sums[2] + values[2], sums[3] + values[3]]
    })
    .reduce((sum, num) => sum + num)

  return result
}
