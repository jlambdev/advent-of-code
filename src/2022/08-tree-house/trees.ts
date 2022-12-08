type Direction = 'left' | 'right' | 'top' | 'bottom';

type TreeMap = Array<Array<number>>;

export function inputToMatrix(input: string): TreeMap {
    return input.split('\n').map((row) => row.split('').map(Number));
}

export function scanMap(
    row: number,
    column: number,
    direction: Direction,
    map: TreeMap,
): [boolean, number] {
    let edgeVisibility = true;
    let viewingDistance = 0;

    if (direction === 'left') {
        if (column !== 0) {
            for (let i = column - 1; i >= 0; i--) {
                viewingDistance++;
                if (map[row][i] >= map[row][column]) {
                    edgeVisibility = false;
                    break;
                }
            }
        }
        return [edgeVisibility, viewingDistance];
    }

    if (direction === 'right') {
        if (column !== map[0].length - 1) {
            for (let i = column + 1; i < map[0].length; i++) {
                viewingDistance++;
                if (map[row][i] >= map[row][column]) {
                    edgeVisibility = false;
                    break;
                }
            }
        }
        return [edgeVisibility, viewingDistance];
    }

    if (direction === 'top') {
        if (row !== 0) {
            for (let i = row - 1; i >= 0; i--) {
                viewingDistance++;
                if (map[i][column] >= map[row][column]) {
                    edgeVisibility = false;
                    break;
                }
            }
        }
        return [edgeVisibility, viewingDistance];
    }

    // bottom
    if (row !== map.length - 1) {
        for (let i = row + 1; i < map.length; i++) {
            viewingDistance++;
            if (map[i][column] >= map[row][column]) {
                edgeVisibility = false;
                break;
            }
        }
    }
    return [edgeVisibility, viewingDistance];
}

export function numVisibleTrees(input: string): number {
    const treeMap = inputToMatrix(input);

    let visibleTrees = 0;

    const getEdgeVisibility = (x: number, y: number, direction: Direction) =>
        scanMap(x, y, direction, treeMap)[0];

    for (let row = 0; row < treeMap[0].length; row++) {
        for (let column = 0; column < treeMap.length; column++) {
            if (
                getEdgeVisibility(row, column, 'left') ||
                getEdgeVisibility(row, column, 'right') ||
                getEdgeVisibility(row, column, 'top') ||
                getEdgeVisibility(row, column, 'bottom')
            ) {
                visibleTrees++;
            }
        }
    }

    return visibleTrees;
}

export function highestScenicScore(input: string): number {
    const treeMap = inputToMatrix(input);

    let highestScore = 0;

    const getVisibilityDistance = (x: number, y: number, direction: Direction) =>
        scanMap(x, y, direction, treeMap)[1];

    for (let row = 0; row < treeMap[0].length; row++) {
        for (let column = 0; column < treeMap.length; column++) {
            const score =
                getVisibilityDistance(row, column, 'left') *
                getVisibilityDistance(row, column, 'right') *
                getVisibilityDistance(row, column, 'top') *
                getVisibilityDistance(row, column, 'bottom');
            if (score > highestScore) {
                highestScore = score;
            }
        }
    }

    return highestScore;
}
