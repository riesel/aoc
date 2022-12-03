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

  const replaceMap: Array<[string, string]> = [
    ["A X", "Z"], //loose against rock with scissor
    ["A Y", "X"],
    ["A Z", "Y"],
    ["B X", "X"], //loose against paper with rock
    ["B Y", "Y"],
    ["B Z", "Z"],
    ["C X", "Y"], //loose against scissor with paper
    ["C Y", "Z"],
    ["C Z", "X"],
  ]
  const shapeScoreMap: Array<[string, number]> = [
    ["X", 1],
    ["Y", 2],
    ["Z", 3],
  ]
  let result = 0

  data.forEach(state => {
    let replacedState = replaceMyMove(state, replaceMap)
    let score = scoreMap.find(element => element[0] === replacedState)?.at(1) as number
    let shape = replacedState.charAt(2)
    result = result + score + (shapeScoreMap.find(element => element[0] === shape)?.at(1) as number)
  })
  return result
}

function replaceMyMove(dataOrig: string, replaceMap: Array<[string, string]>) {
  let index = replaceMap.findIndex(el => el[0] === dataOrig)
  return dataOrig.substring(0, 2) + replaceMap[index].at(1)
}
