import { createMatrix, times } from "../../utils"

export default function (rawData: string) {
  const { matrix, cols } = createMatrix(rawData)
  const offsets = [-1 - cols, -cols, 1 - cols, -1, 1, cols - 1, cols, cols + 1]

  let flashCount = 0

  function flash(pos: number) {
    flashCount++
    matrix[pos] = 88

    offsets.map(offset => offset + pos).forEach(pos => {
      if (matrix[pos] < 88 && ++matrix[pos] >= 10) {
        flash(pos)
      }
    })
  }

  function goStep() {
    matrix.forEach((cell, pos) => cell < 99 && (matrix[pos] = cell + 1))
    matrix.forEach((cell, pos) => cell === 10 && flash(pos))
    matrix.forEach((cell, pos) => cell === 88 && (matrix[pos] = 0))
  }

  times(100, goStep)
  return flashCount
}
