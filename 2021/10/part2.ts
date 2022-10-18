const open = ["(", "[", "{", "<"]
const close = [")", "]", "}", ">"]
const scores = [1, 2, 3, 4]

type Info = { stack: string[]; char: "" }

function parseLine(line: string) {
  const stack = [] as number[]
  for (let char of line.split("")) {
    const index = open.findIndex(d => d === char)
    if (index >= 0) {
      stack.unshift(index)
    } else if (char === close[stack[0]]) {
      stack.shift()
    } else {
      return null
    }
  }
  return stack.map(c => scores[c]).reduce((acc, val) => acc * 5 + val, 0)
}

export default function (rawData: string) {
  const result = rawData
    .split("\n")
    .map(parseLine)
    .filter(l => l) as number[]
  result.sort((a, b) => a - b)

  return result[Math.floor(result.length / 2)]
}
