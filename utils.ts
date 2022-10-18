export function parseIntegers(input: string, separator = " ", type = Number) {
  return input.split(separator).map(type)
}

export function splitBlocks(input: string) {
  return input.split("\n\n")
}

export function splitLines(input: string) {
  return input.split("\n")
}

export type Matrix<T> = T[][]

export function transpose<T>(matrix: Matrix<T>) {
  return matrix[0].map((_, c) => matrix.map((_, r) => matrix[r][c]))
}

export function binary(bitString: (string | number)[]) {
  return parseInt(bitString.join(""), 2)
}

export function* range(begin: number, end: number) {
  for (let i = begin; i <= end; i += 1) {
    yield i;
  }
}

export function times(num: number, func: () => void) {
  [...range(0, num - 1)].forEach(func)
}

export function createMatrix(rawData: string) {
  const input = rawData.split("\n")
  const emptyRow = "".padStart(input[0].length, "X")
  input.unshift(emptyRow)
  input.push(emptyRow)

  const extended = input.map(row => ["X", ...row.split(""), "X"])
  const matrix = extended.flat().map(cell => cell === "X" ? 99 : Number(cell))
  const cols = extended[0].length
  return { matrix, cols }
}

export function printMatrix(matrix: number[], cols: number, maxCellLength = 2) {
  const chunks = matrix.reduce((chunks, cell, i) => {
    const ch = Math.floor(i / cols)
    chunks[ch] = ([] as number[]).concat((chunks[ch] || []), cell)
    return chunks
  }, [] as number[][])
  console.log(chunks.map(row => row.map(cell => ("" + cell).padStart(maxCellLength)).join(" ")).join("\n") + "\n")
}

export function buildObject<T>(arr: (string | number)[][]): Record<string, T> {
  return Object.assign({}, ...arr.map(([key, val]) => ({[key]: val})))
}
