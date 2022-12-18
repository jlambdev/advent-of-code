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
    reverse: boolean,
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

        if (reverse) {
            // Used for Part 2, where we start from the end node
            // Only yield neighbour if it is at least 1 unit lower, equal or higher than others
            if (getHeight(grid[neighbourX][neighbourY], grid[x][y]) <= 1) {
                yield [neighbourX, neighbourY];
            }
        } else {
            // Used for Part 1:
            // Only yield neighbour if it is at most 1 unit higher, equal or any unit lower
            if (getHeight(grid[x][y], grid[neighbourX][neighbourY]) <= 1) {
                yield [neighbourX, neighbourY];
            }
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
 *
 * For Part 2, you need to find the shortest distance from any 'a' step.
 * A recommended strategy here is to backtrack from the end node, instead of
 * searching all possible locations, since you have only 1 end node and just
 * need to find the distance to the first 'a' node you encounter.
 */
export function smallestNumberOfSteps(input: string, reverse: boolean = false): number {
    const grid = makeGrid(input);
    let { start, end } = findStartAndEnd(grid);

    if (reverse) {
        [start, end] = [end, start];
    }

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

        if (!reverse) {
            // Part 1: if it's the end, we have found the shortest distance
            if (x === end[0] && y === end[1]) {
                return steps;
            }
        } else {
            // Part 2: if we have reached any 'a' charater
            if (grid[x][y] === 'a') {
                return steps;
            }
        }

        for (const [neighbourX, neighbourY] of getNeighbours(grid, x, y, reverse)) {
            edgeList.push([steps + 1, neighbourX, neighbourY]);
        }

        sortEdgeListByMinDistance(edgeList); // alternatively use a min prio queue (heap)
    }

    throw new Error('Unable to find shortest distance in edge list');
}
