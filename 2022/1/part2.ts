export default function (rawData: string) {
  const data = rawData.split("\n").map(Number)

  let dataPerElves: number[] = []

  let sum = 0
  for (let i = 0; i <= data.length; i++) {
    if (data[i] != 0) {
      sum = sum + data[i]
    } else {
      dataPerElves.push(sum)
      sum = 0
    }
  }
  console.log(dataPerElves[0] + " " + dataPerElves[1] + " " + dataPerElves[2])
  dataPerElves.sort((a, b) => (a < b ? 1 : -1))

  console.log(dataPerElves[0] + " " + dataPerElves[1] + " " + dataPerElves[2])
  return dataPerElves[0] + dataPerElves[1] + dataPerElves[2]
}
