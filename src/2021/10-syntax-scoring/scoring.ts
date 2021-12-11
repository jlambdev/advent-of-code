const characterToPointsMap = new Map<string, number>([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
]);

const openChunkSet = new Set(['(', '[', '{', '<']);
const closeToOpenChunkMap = new Map<string, string>([
    [')', '('],
    [']', '['],
    ['}', '{'],
    ['>', '<'],
]);

export const findSyntaxErrorScore = (input: string) => {
    const lines = input.split('\n');

    let score = 0;

    for (const line of lines) {
        const stack = [];
        for (const chunk of line) {
            if (openChunkSet.has(chunk)) stack.push(chunk);
            else if (closeToOpenChunkMap.has(chunk)) {
                if (stack.pop() !== closeToOpenChunkMap.get(chunk)) {
                    score += characterToPointsMap.get(chunk);
                }
            } else throw new Error('Unrecognised chunk');
        }
    }

    return score;
};
