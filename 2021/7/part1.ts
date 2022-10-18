export default function (rawData: string) {
  const data = rawData
    .split(",")
    .map(Number)
    .sort((a, b) => a - b)

  return (data[data.length - 1] - data[0]) / 2
}
