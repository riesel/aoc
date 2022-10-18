type Buckets = number[]

export default function (rawData: string) {
  function iteration(buckets: Buckets): Buckets {
    const newFishes = buckets.shift() || 0
    buckets[6] += newFishes
    return [...buckets, newFishes]
  }

  const data = rawData
    .split(",")
    .map(Number)
    .reduce((bucket, num) => {
      bucket[num]++
      return bucket
    }, Array(9).fill(0))

  return [...Array(256).keys()].reduce(iteration, data).reduce((sum, val) => sum + val)
}
