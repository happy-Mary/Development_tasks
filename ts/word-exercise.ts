const arr = ['test', 'tester', 'testertest', 'testing', 'safdsafsffffsdfasdfsa', 'testingtester'];

const findLongestString = (words: string[]): string => {
    const sorted = words.sort((a: string, b: string) => b.length - a.length);
    return sorted[0];
}

const findMostWords = (words: string[]): string => {
    const sorted = words.sort((a: string, b: string) => a.length - b.length);
    let maxCount = 0;
    let resultWord = '';

    for (let i = sorted.length - 1; i >= 0; i--) {
        const currentWord = sorted[i];
        let count = 0;

        for (let k = 0; k < i; k++) {
            if (currentWord.includes(sorted[k])) count++;
        }

        if (count > maxCount) {
            maxCount = count;
            resultWord = currentWord;
        }
    }

    return resultWord;
}

console.log('longestWord: ', findLongestString(arr))
console.log('mostContained: ', findMostWords(arr))