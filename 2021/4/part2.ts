type Board = (number | null)[][]

export default function (rawData: string) {
  function transpose(board: Board): Board {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]))
  }

  function mapBlocks(block: string, index: number) {
    if (index) {
      return {
        ["board" + index]: block.split("\n").map(row =>
          row
            .split(/\s+/)
            .filter(c => c)
            .map(Number)
        ),
      }
    } else {
      return { numbers: block.split(",").map(Number) }
    }
  }

  const unsolved = (_: unknown, index: number) => !solved.includes(index)

  function markOnBoards(res: { num: number; boardNo: number } | undefined, num: number) {
    function mark(board: Board) {
      board.forEach(row =>
        row.forEach((cell, col) => {
          if (cell === num) {
            row[col] = null
          }
        })
      )
      return board
    }

    if (res === undefined) {
      boards.map(mark).forEach((board, boardNo) => {
        if (!solved.includes(boardNo) && isSolved(board)) {
          solved.push(boardNo)
          if (solved.length === boards.length) {
            res = { num, boardNo }
          }
        }
      })
    }

    return res
  }

  function isSolved(board: Board) {
    return (
      board.some(row => row.every(cell => cell === null)) ||
      transpose(board).some(row => row.every(cell => cell === null))
    )
  }

  function calculateSum(board: Board) {
    return (board as number[][]).reduce((sum, row) => sum + row.reduce((sum, val) => sum + (val || 0), 0), 0)
  }

  const data = Object.assign({}, ...rawData.split("\n\n").map(mapBlocks))
  const numbers = data.numbers as number[]
  delete data.numbers
  const boards = Object.values(data) as number[][][]
  const solved = [] as number[]

  const { num, boardNo } = numbers.reduce(markOnBoards, undefined) as { num: number; boardNo: number }
  const sum = calculateSum(boards[boardNo])
  return sum * num
}
