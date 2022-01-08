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
        } else {
            // 'R'
        }
    }

    console.log({ top, bottom, left, right });

    return top * 8 + left;
};
