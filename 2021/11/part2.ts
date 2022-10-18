import { createMatrix } from "../../utils"

export default function (rawData: string) {
  const { matrix, cols } = createMatrix(rawData)
  const offsets = [-1 - cols, -cols, 1 - cols, -1, 1, cols - 1, cols, cols + 1]

  function flash(pos: number) {
    matrix[pos] = 88

    offsets.map(offset => offset + pos).forEach(pos => {
      if (matrix[pos] < 88 && ++matrix[pos] >= 10) {
        flash(pos)
      }
    })
  }

  function goStep() {
    matrix.forEach((cell, pos) => cell === 88 && (matrix[pos] = 0))
    matrix.forEach((cell, pos) => cell < 99 && (matrix[pos] = cell + 1))
    matrix.forEach((cell, pos) => cell === 10 && flash(pos))
    return !matrix.every(cell => cell >= 88)
  }

  let i = 1
  while (goStep()) {
    i++
  }
  return i
}
