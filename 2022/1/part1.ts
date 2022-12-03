export default function (rawData: string) {
  const data = rawData.split("\n").map(Number)

  const dataPerElves: number[] = []

  function arrayMax(arr: number[]) {
    var len = arr.length,
      max = -Infinity
    while (len--) {
      if (Number(arr[len]) > max) {
        max = Number(arr[len])
      }
    }
    return max
  }

  let sum = 0
  for (let i = 0; i <= data.length; i++) {
    if (data[i] != 0) {
      sum = sum + data[i]
    } else {
      dataPerElves.push(sum)
      sum = 0
    }
  }
  return arrayMax(dataPerElves)
}
