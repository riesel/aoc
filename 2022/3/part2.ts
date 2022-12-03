import { groupsOf, intersect, splitLines, sum, unique } from "../../utils"
import { toPriority } from "./common"

export default function (rawData: string) {
  const rucksacks = splitLines(rawData).map(rucksack => rucksack.split(""))
  const priorities = groupsOf(3, rucksacks)
    .flatMap(group => intersect(...group.map(unique)))
    .map(toPriority)

  return sum(priorities)
}
