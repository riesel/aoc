export default function (rawData: string) {
  const data = rawData.split("\n")
  const scoreMap: Array<[string, number]> = [
    ["A X", 3],
    ["A Y", 6],
    ["A Z", 0],
    ["B X", 0],
    ["B Y", 3],
    ["B Z", 6],
    ["C X", 6],
    ["C Y", 0],
    ["C Z", 3],
  ]
  const shapeScoreMap: Array<[string, number]> = [
    ["X", 1],
    ["Y", 2],
    ["Z", 3],
  ]
  let result = 0
  data.forEach(state => {
    let score = scoreMap.find(element => element[0] === state)?.at(1) as number
    let shape = state.charAt(2)
    result = result + score + (shapeScoreMap.find(element => element[0] === shape)?.at(1) as number)
  })
  return result
}
