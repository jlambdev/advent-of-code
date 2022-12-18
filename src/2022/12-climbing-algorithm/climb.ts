export type Grid = Array<Array<string>>;

export type Coordinates = [number, number];

/* Array of tuples, with [distance/cost, x, y] */
export type EdgeList = Array<[number, number, number]>;

export function makeGrid(input: string): Grid {
    return input.split('\n').map((row) => row.split(''));
}

export function getHeight(from: string, to: string): number {
    if (from === 'S') {
        from = 'a';
    }
    if (to === 'E') {
        to = 'z';
    }
    return to.charCodeAt(0) - from.charCodeAt(0);
}

export function findStartAndEnd(grid: Grid): { start: Coordinates; end: Coordinates } {
    let start: Coordinates;
    let end: Coordinates;

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] === 'S') {
                start = [row, column];
            } else if (grid[row][column] === 'E') {
                end = [row, column];
            }
        }
    }

    return {
        start,
        end,
    };
}

export function* getNeighbours(
    grid: Grid,
    x: number,
    y: number,
): Generator<Coordinates, void, Coordinates> {
    const gridHeight = grid.length;
    const gridLength = grid[0].length;

    for (const [differenceX, differenceY] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ]) {
        const neighbourX = x + differenceX;
        const neighbourY = y + differenceY;

        // Ignore any locations that are out of bounds of the Grid
        if (
            neighbourX < 0 ||
            neighbourY < 0 ||
            neighbourX >= gridHeight ||
            neighbourY >= gridLength
        ) {
            continue;
        }

        // Only if the new location is at most 1 unit higher, equal or any unit lower
        if (getHeight(grid[x][y], grid[neighbourX][neighbourY]) <= 1) {
            yield [neighbourX, neighbourY];
        }
    }
}

export function sortEdgeListByMinDistance(edgeList: EdgeList): void {
    edgeList.sort((a, b) => a[0] - b[0]);
}

/**
 * Uses Dijkstra's algorithm to identify the path with the smallest cost.
 *
 * You can make this more efficient by using a min priority queue instead.
 * There's no natively supported collection in TypeScript, the Python
 * equivalent would be the `heapq` module.
 */
export function smallestNumberOfSteps(input: string): number {
    const grid = makeGrid(input);
    const { start, end } = findStartAndEnd(grid);

    const visitedNodes = new Set<string>();
    const edgeList: EdgeList = [];

    // Add the start node to the edge list with a distance/cost of 0
    edgeList.push([0, start[0], start[1]]);

    while (edgeList.length > 0) {
        const [steps, x, y] = edgeList.shift();

        if (visitedNodes.has(`${x},${y}`)) {
            continue;
        }
        visitedNodes.add(`${x},${y}`);

        // if it's the end, we have found the shortest distance
        if (x === end[0] && y === end[1]) {
            return steps;
        }

        for (const [neighbourX, neighbourY] of getNeighbours(grid, x, y)) {
            edgeList.push([steps + 1, neighbourX, neighbourY]);
        }

        sortEdgeListByMinDistance(edgeList); // alternatively use a min prio queue (heap)
    }

    throw new Error('Unable to find shortest distance in edge list');
}
