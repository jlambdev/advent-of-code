type Coordinates = { x: number; y: number };

/**
 * https://en.wikipedia.org/wiki/Taxicab_geometry
 */
function getManhattanDistance(sensor: Coordinates, beacon: Coordinates) {
    return Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
}

function extractSensorAndBeacon(line: string): {
    sensor: Coordinates;
    beacon: Coordinates;
} {
    let sensorMatch = line.match(/Sensor at x=(\d+), y=(\d+)/);
    let beaconMatch = line.match(/closest beacon is at x=(-?\d+), y=(-?\d+)/);

    return {
        sensor: {
            x: parseInt(sensorMatch[1]),
            y: parseInt(sensorMatch[2]),
        },
        beacon: {
            x: parseInt(beaconMatch[1]),
            y: parseInt(beaconMatch[2]),
        },
    };
}

export function numNonBeaconPositionsForRow(input: string, row: number): number {
    const beaconsInRow = new Set<number>();
    const scannedPositions = new Set<number>();

    input.split('\n').forEach((line) => {
        const { sensor, beacon } = extractSensorAndBeacon(line);

        if (beacon.y === row) {
            beaconsInRow.add(beacon.x);
        }

        const distanceToBeacon = getManhattanDistance(sensor, beacon);
        const highestY = sensor.y - distanceToBeacon;
        const lowestY = sensor.y + distanceToBeacon;
        const rowIsWithinRange = row <= lowestY && row >= highestY;

        if (rowIsWithinRange) {
            const horizontalReach = distanceToBeacon - Math.abs(sensor.y - row);
            for (let i = 0; i <= horizontalReach; i++) {
                scannedPositions.add(sensor.x + i);
                scannedPositions.add(sensor.x - i);
            }
        }
    });

    return scannedPositions.size - beaconsInRow.size;
}

export function findTuningFrequencyOfDistressBeacon(
    input: string,
    min: number,
    max: number,
) {
    // still 16 trillion possible locations for the puzzle input...

    // even an adaptation of the 1st solution will be 1.5 seconds x max
    //...which will take 9 weeks (!) to compute

    return 0;
}
