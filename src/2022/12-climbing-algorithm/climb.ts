/*
    load the map into a 2d array?

    S is not always in the top left corner
    unless you just hardcodde the starting position

    look into dijkstra's algorithm?
    BFS / DFS..?
*/

const X = 0;
const Y = 1;

export function smallestNumberOfSteps(
    input: string,
    startingPosition: [number, number],
): number {
    const map = input.split('\n').map((row) => row.split(''));

    // console.log({ map, startingPosition });

    return 0;
}
