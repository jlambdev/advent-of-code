export const getSeatId = (input: string) => {
    let top = 0;
    let bottom = 127;
    for (const row of input.substring(0, 7)) {
        if (row === 'F') {
            bottom -= Math.round((bottom - top) / 2);
        } else {
            top += Math.round((bottom - top) / 2); // 'B'
        }
    }

    let left = 0;
    let right = 7;
    for (const column of input.substring(7)) {
        if (column === 'L') {
            right -= Math.round((right - left) / 2);
        } else {
            left += Math.round((right - left) / 2); // 'R'
        }
    }

    return top * 8 + left;
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
