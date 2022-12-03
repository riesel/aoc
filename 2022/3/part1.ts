import { intersect, splitLines, sum, unique } from "../../utils"
import { toPriority } from "./common"

export default function (rawData: string) {
  const priorities = splitLines(rawData)
    .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
    .flatMap(slice => intersect(...slice.map(unique)))
    .map(toPriority)

  return sum(priorities)
}
