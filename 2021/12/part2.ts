type Step = {
  name: string
  isUppercase: boolean
}

export default function (rawData: string) {
  const connections = rawData
    .split("\n")
    .map(row => row.split("-"))
    .flatMap(([from, to]) => [[from, to], [to, from]])
    .filter(([_, to]) => to !== "start")
    .reduce((acc, [from, to]) => {
      return { ...acc, [from]: (acc[from] || []).concat({ name: to, isUppercase: to == to.toUpperCase() }) }
    }, {} as Record<string, Step[]>)

  function doubleLowerCaseStepExists(path: string[]) {
    const frequencies = path
      .filter(step => step === step.toLowerCase())
      .reduce((set, step) => ({ ...set, [step]: (set[step] || 0) + 1 }), {} as Record<string, number>)
    return Object.values(frequencies).some(value => value > 1)
  }

  function possibleStep(step: Step, path: string[], lcExists: boolean) {
    return step.isUppercase
      || !path.filter(p => p === step.name).length
      || !lcExists
  }

  function findPaths(from: string, path: string[]): string[][] {
    path.push(from)
    if (from === "end") {
      return [path]
    }

    const lcExists = doubleLowerCaseStepExists(path)
    return connections[from]
      .filter(step => possibleStep(step, path, lcExists))
      .map(step => findPaths(step.name, [...path]))
      .flat()
  }

  return (findPaths("start", []).map(path => path.join(",")).length)
}
