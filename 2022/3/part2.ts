export default function (rawData: string) {
  const data = rawData.split("\n")
  let typeMap = new Map<string, number>()
  let result = 0

  function getPrio(duplicate: string) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.indexOf(duplicate) + 1
  }

  function typeIsContained(rucksack: string, type: string) {
    return rucksack.includes(type)
  }

  while (data.length > 0) {
    let uniqueChars = [...new Set((data[0] || "").split(""))]
    uniqueChars.forEach(type => {
      for (let i = 1; i < 3; i++)
        if (typeIsContained(data[i] || "", type)) {
          typeMap.set(type, (typeMap.get(type) || 0) + 1)
        }
    })
    typeMap.forEach((value, key, map) => (value === 2 ? (result = result + getPrio(key)) : null))

    typeMap = new Map<string, number>()
    data.shift()
    data.shift()
    data.shift()
  }
  return result
}
