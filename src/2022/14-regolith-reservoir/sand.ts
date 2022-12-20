function makeRockSet(input: string): { rocks: Set<string>; deepestRock: number } {
    const paths = input
        .split('\n')
        .map((line) => line.split(' -> ').map((coords) => coords.split(',').map(Number)));

    const rocks = new Set<string>();
    let deepestRock = 0;

    const drawRock = (x: number, y: number) => rocks.add(`${x},${y}`);

    paths.forEach((path) => {
        for (let i = 1; i < path.length; i++) {
            let [x, y] = path[i - 1];
            const [endX, endY] = path[i];

            if (x === endX) {
                if (y < endY) {
                    // Draw down
                    while (y <= endY) {
                        drawRock(x, y);
                        if (y > deepestRock) {
                            deepestRock = y;
                        }
                        y++;
                    }
                } else {
                    // Draw up
                    while (y >= endY) {
                        drawRock(x, y);
                        y--;
                    }
                }
            } else {
                if (x < endX) {
                    // Draw right
                    while (x <= endX) {
                        drawRock(x, y);
                        x++;
                    }
                } else {
                    // Draw left
                    while (x >= endX) {
                        drawRock(x, y);
                        x--;
                    }
                }
            }
        }
    });

    return { rocks, deepestRock };
}

export function unitsOfSandThatRest(input: string, hasFloor: boolean = false): number {
    const { rocks, deepestRock } = makeRockSet(input);

    const occupiedSpaces = new Set([...rocks]);
    let deepestUnitOfSand = 0;
    let settledUnitsOfSand = 0;

    let sandX = 500;
    let sandY = 0;

    // I have no idea why +10 works here in the abyss scenario
    const boundary = hasFloor ? Infinity : deepestRock + 10;
    const floor = deepestRock + 2;

    while (deepestUnitOfSand <= boundary && !occupiedSpaces.has('500,0')) {
        if (
            !occupiedSpaces.has(`${sandX},${sandY + 1}`) &&
            (!hasFloor || sandY + 1 < floor)
        ) {
            // Sand can do down
            sandY++;
        } else if (
            !occupiedSpaces.has(`${sandX - 1},${sandY + 1}`) &&
            (!hasFloor || sandY + 1 < floor)
        ) {
            // Sand can go left
            sandX--;
            sandY++;
        } else if (
            !occupiedSpaces.has(`${sandX + 1},${sandY + 1}`) &&
            (!hasFloor || sandY + 1 < floor)
        ) {
            // Sand can go right
            sandX++;
            sandY++;
        } else {
            // Sand must settle in current position
            occupiedSpaces.add(`${sandX},${sandY}`);
            settledUnitsOfSand++;
            sandX = 500;
            sandY = 0;
        }

        if (sandY > deepestUnitOfSand) {
            deepestUnitOfSand = sandY;
        }
    }

    // Debug
    console.log({
        occ: occupiedSpaces.size,
        deepestRock,
        settledUnitsOfSand,
        deepestUnitOfSand,
    });

    return settledUnitsOfSand;
}
