export default function (rawData: string) {
  const data = rawData.split("\n").map(line => line.split(","))

  let result = 0

  for (let i = 0; i < data.length; i++) {
    if (
      (getBeginning(data[i][0]) <= getBeginning(data[i][1]) && getEnding(data[i][0]) >= getEnding(data[i][1])) ||
      (getBeginning(data[i][1]) <= getBeginning(data[i][0]) && getEnding(data[i][1]) >= getEnding(data[i][0]))
    ) {
      result++
    }
  }
  return result
}

function getBeginning(input: string) {
  const indexOfSeparator = input.indexOf("-")
  return Number(input.substring(0, indexOfSeparator))
}

function getEnding(input: string) {
  const indexOfSeparator = input.indexOf("-")
  return Number(input.substring(indexOfSeparator + 1))
}
