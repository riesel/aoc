import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join, resolve } from "path"
import { hrtime } from "process"

type SolveFunc = (rawData: string) => number | string | Promise<number | string>

async function runModule(part: number, dir: string, inputFile: string, module: { default: SolveFunc }) {
  const input = resolve(dir, inputFile)
  if (existsSync(input)) {
    const data = readFileSync(input, "utf8")
    const start = hrtime.bigint()
    const result = await module.default(data)
    console.log(
      `Result of part ${part} on day ${day.getDate()} (${inputFile}): ${result} (${
        (hrtime.bigint() - start) / 1_000_000n
      }ms)`
    )
  } else {
    console.log(`No ${inputFile} defined for day ${day.getDate()}`)
  }
}

async function run(part: number) {
  const fileName = resolve(dir, `part${part}.ts`)
  if (existsSync(fileName)) {
    const module = await import(fileName)
    runModule(part, dir, "testdata.txt", module)
    runModule(part, dir, "input.txt", module)
  } else {
    console.log(`Part ${part} is not defined for day ${day.getDate()}`)
  }
}

const day = new Date(process.env.DAY || Date.now())
const dir = resolve(__dirname, "" + day.getFullYear(), "" + day.getDate())
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, "input.txt"), "")
  writeFileSync(join(dir, "testdata.txt"), "")
  writeFileSync(join(dir, "part1.ts"), "export default function (rawData: string) {\n  return 0\n}\n")
  writeFileSync(join(dir, "part2.ts"), "export default function (rawData: string) {\n  return 0\n}\n")
}

;(async function () {
  run(1)
  run(2)
})()
