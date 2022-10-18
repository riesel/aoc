export default function (rawData: string) {
  const data = rawData.split("\n").map(line => {
    const parts = line.split(" ")
    return { dir: parts[0], dist: Number(parts[1]) }
  })

  const result = data.reduce(
    (position, command) => {
      switch (command.dir) {
        case "forward":
          position.hor += command.dist
          break

        case "down":
          position.depth += command.dist
          break

        case "up":
          position.depth -= command.dist
          break
      }
      return position
    },
    { hor: 0, depth: 0 }
  )

  return result.depth * result.hor
}
