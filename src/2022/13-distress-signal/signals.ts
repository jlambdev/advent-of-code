type NumberArray = Array<number | NumberArray>;

/* Destructuring for better readability */
const isArray = Array.isArray;
const isNumber = Number.isInteger;

export function parseLine(line: string): NumberArray {
    return JSON.parse(line);
}

export function compare(left: number | NumberArray, right: number | NumberArray): number {
    if (isArray(left) && isNumber(right)) {
        right = [right];
    }

    if (isNumber(left) && isArray(right)) {
        left = [left];
    }

    if (isNumber(left) && isNumber(right)) {
        if (left < right) {
            return 1;
        }
        if (left === right) {
            return 0;
        }
        return -1;
    }

    if (isArray(left) && isArray(right)) {
        let i = 0;
        while (i < left.length && i < right.length) {
            const result = compare(left[i], right[i]);
            if (result === 1) {
                return 1;
            }
            if (result === -1) {
                return -1;
            }
            i++;
        }

        if (i === left.length) {
            if (left.length === right.length) {
                return 0;
            }
            return 1;
        }

        return -1;
    }
}

export function sumOfIndicesOfPairsInCorrectOrder(input: string): number {
    const pairs = input.split('\n\n').map((pair) => pair.split('\n').map(parseLine));

    let correctOrderCount = 0;
    pairs.forEach(([left, right], index) => {
        if (compare(left, right) === 1) {
            correctOrderCount += index + 1;
        }
    });

    return correctOrderCount;
}

function isDividerPacket(value: NumberArray): value is [[number]] {
    return (
        value.length === 1 &&
        isArray(value[0]) &&
        value[0].length === 1 &&
        isNumber(value[0][0])
    );
}

export function findDecoderKey(input: string): number {
    const packets = input
        .split('\n')
        .filter((line) => line !== '')
        .map(parseLine);

    packets.push([[2]], [[6]]);
    packets.sort((a, b) => -compare(a, b));

    let indexDividerPacketOne: number;
    let indexDividerPacketTwo: number;

    packets.forEach((packet, index) => {
        if (isDividerPacket(packet)) {
            if (packet[0][0] === 2) {
                indexDividerPacketOne = index + 1;
            }
            if (packet[0][0] === 6) {
                indexDividerPacketTwo = index + 1;
            }
        }
    });

    return indexDividerPacketOne * indexDividerPacketTwo;
}
