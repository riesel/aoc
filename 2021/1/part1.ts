export default function (rawData: string) {
  const data = rawData.split("\n").map(Number)

  return data.reduce(({ sum, prev }, val) => ({ sum: sum + (prev < val ? 1 : 0), prev: val }), {
    sum: -1,
    prev: 0,
  }).sum
}
