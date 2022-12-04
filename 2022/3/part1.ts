export default function (rawData: string) {
  const data = rawData.split("\n")
  let result = 0
  let duplicate = ""

  function getPrio(duplicate: string) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.indexOf(duplicate) + 1
  }

  data.forEach(rucksack => {
    const comp1 = rucksack.substring(0, rucksack.length / 2)
    const comp2 = rucksack.substring(rucksack.length / 2)
    comp1.split("").forEach(char => {
      if (comp2.includes(char)) duplicate = char
    })
    result = result + getPrio(duplicate)
  })
  return result
}
