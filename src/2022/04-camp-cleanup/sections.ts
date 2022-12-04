const MIN = 0;
const MAX = 1;

function splitPairs(pairs: string): Array<Array<Number>> {
    return pairs.split(',').map((pair) => pair.split('-').map(Number));
}

export function hasContainedSection(pairs: string): boolean {
    const [left, right] = splitPairs(pairs);

    const leftContainsRight = right[MIN] <= left[MIN] && right[MAX] >= left[MAX];
    const rightContainsLeft = left[MIN] <= right[MIN] && left[MAX] >= right[MAX];

    return leftContainsRight || rightContainsLeft;
}

export function hasOverlappingSection(pairs: string): boolean {
    const [left, right] = splitPairs(pairs);

    return left[MAX] >= right[MIN] && left[MIN] <= right[MAX];
}

/**
 * Example usage: sumUsingFilterFunction(puzzleInput, hasContainedSection)
 *
 * @param input Puzzle input, e.g. `2-4,6-8\n2-3,4-5...`
 * @param filterFunc hasContainedSection | hasOverlappingSection
 * @returns Number of items that satisfy the condition of the filter function
 */
export function sumUsingFilterFunction(
    input: string,
    filterFunc: (pairs: string) => boolean,
): number {
    return input.split('\n').filter(filterFunc).length;
}
