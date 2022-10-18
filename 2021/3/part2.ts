import { binary, transpose } from "../../utils"

export default function (rawData: string) {
  const data = rawData.split("\n").map(line => line.split("").map(Number))

  function filter(num: number) {
    return [...Array(data[0].length).keys()].reduce((acc: number[][], _, pos) => {
      if (acc.length === 1) {
        return acc
      } else {
        const value = transpose(acc)[pos].filter(bit => bit).length >= acc.length / 2 ? num : 1 - num
        return acc.filter(row => row[pos] === value)
      }
    }, data)[0]
  }

  return binary(filter(1)) * binary(filter(0))
}
