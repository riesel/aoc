const open = ["(", "[", "{", "<"]
const close = [")", "]", "}", ">"]
const scores = [3, 57, 1197, 25137]

function parseLine(line: string) {
  const stack = [] as string[]
  const wrong = line.split("").find(char => {
    const index = open.findIndex(d => d === char)
    if (index >= 0) {
      stack.unshift(close[index])
    } else if (char === stack[0]) {
      stack.shift()
    } else {
      return true
    }
    return false
  })
  if (wrong) {
    return scores[close.findIndex(d => d === wrong)]
  }
  return 0
}

export default function (rawData: string) {
  const result = rawData.split("\n").map(parseLine)

  return result.reduce((sum, val) => sum + val, 0)
}
