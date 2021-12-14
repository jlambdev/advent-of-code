const illegalCharacterPoints = new Map<string, number>([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
]);

const autoCompletePoints = new Map<string, number>([
    ['(', 1],
    ['[', 2],
    ['{', 3],
    ['<', 4],
]);

const openChunkSet = new Set(['(', '[', '{', '<']);
const closeToOpenChunkMap = new Map<string, string>([
    [')', '('],
    [']', '['],
    ['}', '{'],
    ['>', '<'],
]);

export const getScores = (input: string) => {
    const lines = input.split('\n');

    let syntaxErrorScore = 0;
    const autocompleteScores = [];

    for (const line of lines) {
        const stack = [];
        let corrupt = false;
        for (const chunk of line) {
            if (openChunkSet.has(chunk)) stack.push(chunk);
            else if (closeToOpenChunkMap.has(chunk)) {
                if (stack.pop() !== closeToOpenChunkMap.get(chunk)) {
                    syntaxErrorScore += illegalCharacterPoints.get(chunk);
                    corrupt = true;
                    break;
                }
            } else throw new Error('Unrecognised chunk');
        }

        if (stack.length !== 0 && !corrupt) {
            let score = 0;
            for (let i = stack.length - 1; i >= 0; i--) {
                score *= 5;
                score += autoCompletePoints.get(stack[i]);
            }
            autocompleteScores.push(score);
        }
    }

    autocompleteScores.sort((a, b) => b - a);

    return {
        syntaxErrorScore,
        middleScore:
            autocompleteScores[Math.floor(autocompleteScores.length / 2)],
    };
};
