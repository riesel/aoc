export default function (rawData: string) {
  const data = rawData.split("\n").map(Number)

  return data.reduce(
    ({ sum, prev, window }, val) => {
      const heatingUp = window.length < 3
      window = [...window, val].slice(-3)
      const next = heatingUp ? prev + val : window.reduce((a, b) => a + b) + val
      sum = sum + (heatingUp || next <= prev ? 0 : 1)
      return { sum, prev: next, window }
    },
    { sum: -1, prev: 0, window: [] as number[] }
  ).sum
}
