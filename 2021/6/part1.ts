export default function (rawData: string) {
  function iteration(fishes: number[]): number[] {
    const newFishes = [] as number[]
    return fishes
      .map(num => {
        if (num) {
          return num - 1
        } else {
          newFishes.push(8)
          return 6
        }
      })
      .concat(newFishes)
  }

  const fishes = [...Array(80).keys()].reduce(iteration, rawData.split(",").map(Number))

  return fishes.length
}
