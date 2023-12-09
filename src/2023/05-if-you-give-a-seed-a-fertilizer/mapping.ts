type MapRow = {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
};

function parseAlmanac(input: string): {
    seeds: Array<number>;
    maps: Array<Array<MapRow>>;
} {
    const [seedsUnparsed, ...mapsUnparsed] = input.split('\n\n');
    const seeds = seedsUnparsed.replace('seeds: ', '').split(' ').map(Number);
    const maps = mapsUnparsed.map((line: string) => {
        const [_, ...rows] = line
            .split('\n')
            .map((row: string) => row.split(' ').map(Number));
        return rows.map((row) => ({
            destinationRangeStart: row[0],
            sourceRangeStart: row[1],
            rangeLength: row[2],
        }));
    });

    return { seeds, maps };
}

function isNumberInSourceRange(
    number: number,
    sourceRangeStart: number,
    rangeLength: number,
): boolean {
    return number >= sourceRangeStart && number < sourceRangeStart + rangeLength;
}

function getDestinationNumber(
    number: number,
    destinationRangeStart: number,
    sourceRangeStart: number,
) {
    return sourceRangeStart > destinationRangeStart
        ? number - (sourceRangeStart - destinationRangeStart)
        : number + (destinationRangeStart - sourceRangeStart);
}

export function partOne(input: string): number {
    const { seeds, maps } = parseAlmanac(input);

    let closestLocation = Infinity;
    for (const seed of seeds) {
        let number = seed;
        for (const map of maps) {
            for (const { sourceRangeStart, rangeLength, destinationRangeStart } of map) {
                if (isNumberInSourceRange(number, sourceRangeStart, rangeLength)) {
                    number = getDestinationNumber(
                        number,
                        destinationRangeStart,
                        sourceRangeStart,
                    );
                    break;
                }
            }
        }
        if (number < closestLocation) {
            closestLocation = number;
        }
    }

    return closestLocation;
}

// TODO: unsolved
export function partTwo(input: string): number {
    const { seeds, maps } = parseAlmanac(input);

    const memoisedSeedLocationCalculations = new Map<number, number>();

    for (let i = 0; i < seeds.length; i++) {
        for (let seed = seeds[i]; seed < seeds[i + 1]; seed++) {
            // TODO: would memoisation help here?
            // Or starting from location 0 and working backwards?
        }
    }

    return -1;
}
