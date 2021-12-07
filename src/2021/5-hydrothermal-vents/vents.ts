export const findOverlappingVents = (
    input: string,
    withDiagonalLines: boolean,
) => {
    const lines = input.split('\n');

    const coordsWithVents = new Map<string, number>(); // e.g '34,67' -> 1
    const updateCoords = (x: number, y: number) => {
        const key = `${x},${y}`;
        if (coordsWithVents.has(key)) {
            const value = coordsWithVents.get(key);
            coordsWithVents.set(key, value + 1);
        } else {
            coordsWithVents.set(key, 1);
        }
    };

    const plotVerticalLine = (x: number, y1: number, y2: number) => {
        let current = y1;
        while (current <= y2) {
            updateCoords(x, current);
            current++;
        }
    };

    const plotHorizontalLine = (y: number, x1: number, x2: number) => {
        let current = x1;
        while (current <= x2) {
            updateCoords(current, y);
            current++;
        }
    };

    const plotDiagonalLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        direction: string,
    ) => {
        let currentX = x1;
        if (direction === 'down') {
            let currentY = y1;
            while (currentX <= x2) {
                updateCoords(currentX, currentY);
                currentX++;
                currentY++;
            }
        } else {
            let currentY = y1;
            while (currentX <= x2) {
                updateCoords(currentX, currentY);
                currentX++;
                currentY--;
            }
        }
    };

    lines.forEach((line) => {
        const [start, end] = line.split(' -> ');
        const [x1, y1] = start.split(',').map(Number);
        const [x2, y2] = end.split(',').map(Number);

        if (x1 === x2) {
            if (y1 < y2) {
                plotVerticalLine(x1, y1, y2);
            } else {
                plotVerticalLine(x1, y2, y1);
            }
        } else if (y1 === y2) {
            if (x1 < x2) {
                plotHorizontalLine(y1, x1, x2);
            } else {
                plotHorizontalLine(y1, x2, x1);
            }
        } else if (withDiagonalLines) {
            if (x1 < x2) {
                if (y1 < y2) {
                    plotDiagonalLine(x1, y1, x2, y2, 'down'); // 0,0 -> 2,2
                } else {
                    plotDiagonalLine(x1, y1, x2, y2, 'up'); // 0,2 -> 2,0
                }
            } else {
                // reverse input values: (x2, y2), (x1, y1)
                if (y1 < y2) {
                    plotDiagonalLine(x2, y2, x1, y1, 'up'); // 2,2 -> 0,0
                } else {
                    plotDiagonalLine(x2, y2, x1, y1, 'down'); // 2,0 -> 0,2
                }
            }
        }
    });

    // Count overlapping vents
    let overlappingVents = 0;
    for (const value of coordsWithVents.values()) {
        if (value > 1) overlappingVents++;
    }

    // Debugging
    // console.log({ coordsWithVents });

    return overlappingVents;
};
