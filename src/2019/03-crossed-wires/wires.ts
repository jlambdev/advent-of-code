function getManhattanDistance(x: number, y: number): number {
    return Math.abs(x) + Math.abs(y);
}

export function partOne(input: string): number {
    const [firstPath, secondPath] = input.split('\n').map((path: string) =>
        path.split(',').map((line: string) => {
            const [direction, distance] = line.split('');
            return { direction, distance: Number(distance) };
        }),
    );

    let x = 0;
    let y = 0;
    const firstPathCoords = new Set<string>();
    const pathCrossings: Array<string> = [];

    // add all the coordinates of the first path to a set
    firstPath.forEach(({ direction, distance }) => {
        for (let i = 0; i < distance; i++) {
            if (direction === 'U') {
                y++;
            } else if (direction === 'D') {
                y--;
            } else if (direction === 'R') {
                x++;
            } else if (direction === 'L') {
                x--;
            }
            firstPathCoords.add(`${x},${y}`);
        }
    });

    // iterate through the second path and add any coords to pathCrossings present in set
    x = 0;
    y = 0;
    secondPath.forEach(({ direction, distance }) => {
        for (let i = 0; i < distance; i++) {
            if (direction === 'U') {
                y++;
            } else if (direction === 'D') {
                y--;
            } else if (direction === 'R') {
                x++;
            } else if (direction === 'L') {
                x--;
            }
            if (firstPathCoords.has(`${x},${y}`)) {
                pathCrossings.push(`${x},${y}`);
            }
        }
    });

    // console.debug({ pathCrossings });

    return Math.min(
        ...pathCrossings.map((coords: string) => {
            const [x, y] = coords.split(',').map(Number);
            return getManhattanDistance(x, y);
        }),
    );
}
