import { binary, transpose } from "../../utils"

export default function (rawData: string) {
  const oneIf = (cond: (value: number) => boolean) => (value: number) => cond(value) ? "1" : "0"

  const data = transpose(rawData.split("\n").map(line => line.split("").map(Number)))

  const bitCounts = data.map(row => row.filter(bit => bit).length)
  const mean = data[0].length / 2
  const gamma = binary(bitCounts.map(oneIf(count => count > mean)))
  const epsilon = binary(bitCounts.map(oneIf(count => count <= mean)))

  return gamma * epsilon
}
