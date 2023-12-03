type Grid = Array<Array<string>>;

function isNumber(char: string): boolean {
    return Number.isInteger(Number(char));
}

function makeGrid(input: string): Grid {
    return input.split('\n').map((line: string) => line.split(''));
}

function findPartNumbers(grid: Grid): {
    partNumbers: Array<number>;
    gridPositionToPartsMap: Map<string, number>;
} {
    let digits: Array<string> = [];
    const partNumbers: Array<number> = [];
    const gridPositionToPartsMap = new Map<string, number>();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (isNumber(grid[i][j])) {
                digits.push(grid[i][j]);
            }
            if (!isNumber(grid[i][j + 1]) && digits.length > 0) {
                if (hasNearbySymbol(grid, i, j, digits.length)) {
                    const partNumber = Number(digits.join(''));
                    partNumbers.push(partNumber);
                    // additional logic for part 2
                    addGridPositionsToPartsMap(
                        gridPositionToPartsMap,
                        partNumber,
                        digits.length,
                        i,
                        j,
                    );
                }
                digits = [];
            }
        }
    }

    return { partNumbers, gridPositionToPartsMap };
}

// x & y represent the right-most digit
function hasNearbySymbol(grid: Grid, x: number, y: number, numDigits: number): boolean {
    const cellsToCheck: Array<[number, number]> = [];
    cellsToCheck.push([x, y + 1]); // right
    for (let i = y + 1; i > y - numDigits - 1; i--) {
        cellsToCheck.push([x - 1, i]); // top cells (inc. top-right & left)
    }
    cellsToCheck.push([x, y - numDigits]); // left
    for (let i = y - numDigits; i <= y + 1; i++) {
        cellsToCheck.push([x + 1, i]); // bottom cells (inc. b-left & right)
    }

    return cellsToCheck.some(([row, col]) => {
        const neighbour = grid[row]?.[col];
        return !!neighbour && neighbour !== '.';
    });
}

// store references like '0,2' => 467 for lookup
function addGridPositionsToPartsMap(
    map: Map<string, number>,
    partNumber: number,
    numDigits: number,
    x: number,
    y: number,
): void {
    for (let i = y; i > y - numDigits; i--) {
        map.set(`${x},${i}`, partNumber);
    }
}

function getPartNumbersNextToGear(
    map: Map<string, number>,
    x: number,
    y: number,
): Array<number> {
    const uniqueNumbers = new Set<number>();

    const cellsToCheck: Array<[number, number]> = [];
    cellsToCheck.push([x, y - 1], [x, y + 1]); // left, right
    cellsToCheck.push([x - 1, y - 1], [x - 1, y], [x - 1, y + 1]); // top
    cellsToCheck.push([x + 1, y - 1], [x + 1, y], [x + 1, y + 1]); // bottom

    cellsToCheck.forEach(([row, col]) => {
        const key = `${row},${col}`;
        if (map.has(key)) {
            uniqueNumbers.add(map.get(key));
        }
    });

    return Array.from(uniqueNumbers);
}

export function partOne(input: string): number {
    const grid = makeGrid(input);

    const { partNumbers } = findPartNumbers(grid);

    return partNumbers.reduce((total, current) => (total += current), 0);
}

export function partTwo(input: string): number {
    const grid = makeGrid(input);

    const { gridPositionToPartsMap } = findPartNumbers(grid);

    // scan the grid for '*' symbols
    const gearRatios: Array<number> = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '*') {
                const parts = getPartNumbersNextToGear(gridPositionToPartsMap, i, j);
                if (parts.length === 2) {
                    gearRatios.push(parts[0] * parts[1]);
                }
            }
        }
    }

    return gearRatios.reduce((total, current) => (total += current), 0);
}
