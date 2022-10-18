export default function (rawData: string) {
  const connections = rawData
    .split("\n")
    .map(row => row.split("-"))
    .flatMap(([from, to]) => [[from, to], [to, from]])

  function findPaths(from: string, path: string[]): string[][] {
    path.push(from)
    if (from === "end") {
      return [path]
    }

    const steps = connections
      .filter(step => step[0] === from)
      .map(step => step[1])
      .filter(step => step === step.toUpperCase() || !path.includes(step))

    const newPaths = steps.map(step => findPaths(step, [...path])).flat()
    return newPaths
  }

  return (findPaths("start", []).map(path => path.join(",")).length)
}
