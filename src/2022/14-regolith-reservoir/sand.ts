function addRocksToSet(input: string): { rocks: Set<string>; maxY: number } {
    const paths = input
        .split('\n')
        .map((line) => line.split(' -> ').map((coords) => coords.split(',').map(Number)));

    let maxY = 0;
    const rocks = new Set<string>();
    const addRock = (x: number, y: number) => rocks.add(`${x},${y}`);

    paths.forEach((path) => {
        for (let i = 1; i < path.length; i++) {
            const [prevX, prevY] = path[i - 1];
            const [currentX, currentY] = path[i];

            if (currentY > maxY) {
                maxY = currentY;
            }

            if (currentY !== prevY) {
                for (
                    let y = Math.min(currentY, prevY);
                    y < Math.max(currentY, prevY) + 1;
                    y++
                ) {
                    addRock(currentX, y);
                }
            }

            if (currentX !== prevX) {
                for (
                    let x = Math.min(currentX, prevX);
                    x < Math.max(currentX, prevX) + 1;
                    x++
                ) {
                    addRock(x, currentY);
                }
            }
        }
    });

    return { rocks, maxY };
}

export function numRestingSandUnitsWithAbyss(input: string): number {
    const { rocks: occupied, maxY } = addRocksToSet(input);

    const fillSand = (): boolean => {
        let x = 500;
        let y = 0;

        while (y <= maxY) {
            if (!occupied.has(`${x},${y + 1}`)) {
                y++;
                continue;
            }
            if (!occupied.has(`${x - 1},${y + 1}`)) {
                x--;
                y++;
                continue;
            }
            if (!occupied.has(`${x + 1},${y + 1}`)) {
                x++;
                y++;
                continue;
            }
            occupied.add(`${x},${y}`);
            return true;
        }
        return false;
    };

    let restingSandUnits = 0;
    while (true) {
        const sandCameToRest = fillSand();
        if (!sandCameToRest) {
            break;
        }
        restingSandUnits++;
    }

    return restingSandUnits;
}

export function numRestingSandUnitsWithFloor(input: string): number {
    const { rocks: occupied, maxY } = addRocksToSet(input);

    const fillSand = (): [number, number] => {
        let x = 500;
        let y = 0;

        if (occupied.has(`${x},${y}`)) {
            return [x, y];
        }

        while (y <= maxY) {
            if (!occupied.has(`${x},${y + 1}`)) {
                y++;
                continue;
            }
            if (!occupied.has(`${x - 1},${y + 1}`)) {
                x--;
                y++;
                continue;
            }
            if (!occupied.has(`${x + 1},${y + 1}`)) {
                x++;
                y++;
                continue;
            }
            break; // everything filled
        }

        return [x, y];
    };

    let restingSandUnits = 0;
    while (true) {
        const [x, y] = fillSand();
        occupied.add(`${x},${y}`);
        restingSandUnits++;
        if (x === 500 && y === 0) {
            break;
        }
    }

    return restingSandUnits;
}
