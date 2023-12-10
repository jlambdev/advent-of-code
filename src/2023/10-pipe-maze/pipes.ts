type Position = {
    row: number;
    col: number;
    value?: string;
    previousMove?: string;
};

function getFirstPipes(grid: Array<string>, row: number, col: number): Array<Position> {
    const pipes: Array<Position> = [];

    // check above
    if (['|', '7', 'F'].includes(grid[row - 1][col])) {
        pipes.push({ row: row - 1, col, value: grid[row - 1][col], previousMove: 'U' });
    }

    // check below
    if (['|', 'L', 'J'].includes(grid[row + 1][col])) {
        pipes.push({ row: row + 1, col, value: grid[row + 1][col], previousMove: 'D' });
    }

    // check left
    if (['-', 'L', 'F'].includes(grid[row][col - 1])) {
        pipes.push({ row, col: col - 1, value: grid[row][col - 1], previousMove: 'L' });
    }

    // check right
    if (['-', 'J', '7'].includes(grid[row][col + 1])) {
        pipes.push({ row, col: col + 1, value: grid[row][col + 1], previousMove: 'R' });
    }

    return pipes;
}

function getStartingPosition(grid: Array<string>): {
    start: Position;
    pipes: Array<Position>;
} {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 'S') {
                return { start: { row: i, col: j }, pipes: getFirstPipes(grid, i, j) };
            }
        }
    }
    throw new Error('Unable to find starting position');
}

function nextPipeTile(grid: Array<string>, tile: Position): Position {
    const { row, col, value, previousMove } = tile;

    if (previousMove === 'U') {
        if (value === 'F') {
            return { row, col: col + 1, value: grid[row][col + 1], previousMove: 'R' };
        } else if (value === '7') {
            return { row, col: col - 1, value: grid[row][col - 1], previousMove: 'L' };
        } else {
            // continue up (value is '|')
            return { row: row - 1, col, value: grid[row - 1][col], previousMove: 'U' };
        }
    }

    if (previousMove === 'D') {
        if (value === 'L') {
            return { row, col: col + 1, value: grid[row][col + 1], previousMove: 'R' };
        } else if (value === 'J') {
            return { row, col: col - 1, value: grid[row][col - 1], previousMove: 'L' };
        } else {
            // continue down (value is '|')
            return { row: row + 1, col, value: grid[row + 1][col], previousMove: 'D' };
        }
    }

    if (previousMove === 'L') {
        if (value === 'L') {
            return { row: row - 1, col, value: grid[row - 1][col], previousMove: 'U' };
        } else if (value === 'F') {
            return { row: row + 1, col, value: grid[row + 1][col], previousMove: 'D' };
        } else {
            // continue left (value is '-')
            return { row, col: col - 1, value: grid[row][col - 1], previousMove: 'L' };
        }
    }

    // previous move must be 'R'
    if (value === 'J') {
        return { row: row - 1, col, value: grid[row - 1][col], previousMove: 'U' };
    } else if (value === '7') {
        return { row: row + 1, col, value: grid[row + 1][col], previousMove: 'D' };
    } else {
        // continue right (value is '-')
        return { row, col: col + 1, value: grid[row][col + 1], previousMove: 'R' };
    }
}

export function partOne(input: string): number {
    const grid = input.split('\n');
    const { start, pipes } = getStartingPosition(grid);

    let maxIterations = 10000;
    let numSteps = 1;

    while (
        numSteps < maxIterations &&
        (pipes[0].row !== pipes[1].row || pipes[0].col !== pipes[1].col)
    ) {
        pipes[0] = nextPipeTile(grid, pipes[0]);
        pipes[1] = nextPipeTile(grid, pipes[1]);
        numSteps++;
    }

    return numSteps;
}
