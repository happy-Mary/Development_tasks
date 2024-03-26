// tsc --outDir ./dist --target es2016 find-unique.ts/
const roadmaps = ['JavaScript', 'React', 'Node.js', 'Node.js', 'JavaScript'];

const findUniqueBySet = (arr: string[]): string[] => {
  return [...new Set(arr)];
}

const findUniqueByFilter = (arr: string[]): string[] => {
  return arr.filter((word: string, index: number) => arr.indexOf(word) === index)
}

const findUniqueByReduce = (arr: string[]): string[] => {
  return arr.reduce((unique: string[], word: string) => {
    return unique.includes(word) ? unique : [...unique, word]
  }, []);
}

const findUniqueByForEach = (arr: string[]): string[] => {
  const uniqueArray: string[] = [];
  arr.forEach((word: string) => {
    if (!uniqueArray.includes(word)) {
        uniqueArray.push(word);
      }
  });

  return uniqueArray;
}

const findUniqueByForOf = (arr: string[]): string[] => {
  const uniqueArray: string[] = [];

  for (const word of arr) {
    if (!uniqueArray.includes(word)) {
      uniqueArray.push(word);
    }
  }

  return uniqueArray;
}

console.log('Initial array: ', roadmaps, '\n')
console.log('findUniqueBySet: ', findUniqueBySet(roadmaps))
console.log('findUniqueByFilter: ', findUniqueByFilter(roadmaps))
console.log('findUniqueByReduce: ', findUniqueByReduce(roadmaps))
console.log('findUniqueByForEach: ', findUniqueByForEach(roadmaps))
console.log('findUniqueByForOf: ', findUniqueByForOf(roadmaps))