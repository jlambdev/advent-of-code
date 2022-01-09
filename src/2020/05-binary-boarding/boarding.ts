const binarySearch = (
    upperBound: number,
    steps: string,
    shouldReduceUpperBound: (step: string) => boolean,
) => {
    let lowerBound = 0;
    for (const step of steps) {
        if (shouldReduceUpperBound(step)) {
            upperBound -= Math.round((upperBound - lowerBound) / 2);
        } else {
            lowerBound += Math.round((upperBound - lowerBound) / 2);
        }
    }
    return lowerBound;
};

export const getSeatId = (input: string) => {
    const row = binarySearch(
        127,
        input.substring(0, 7),
        (step: string) => step === 'F',
    );

    const column = binarySearch(
        7,
        input.substring(7),
        (step: string) => step === 'L',
    );

    return row * 8 + column;
};

export const getHighestSeatId = (input: string) => {
    return input.split('\n').reduce((highestId, boardingPass) => {
        const seatId = getSeatId(boardingPass);
        return seatId > highestId ? seatId : highestId;
    }, 0);
};

export const getMissingSeatId = (input: string) => {
    const seats = input
        .split('\n')
        .map((boardingPass) => getSeatId(boardingPass))
        .sort((a, b) => a - b);

    // probably a smarter way of doing this, but puzzle input size is really small
    let prev;
    for (let seat of seats) {
        if (prev && seat - prev > 1) return seat - 1;

        prev = seat;
    }
};
