const positionAfterFold = (
    axis: string,
    value: number,
    x: number,
    y: number,
) => {
    if (axis === 'x') {
        if (x > value) {
            x -= 2 * (x - value);
        }
    } else {
        if (y > value) {
            y -= 2 * (y - value);
        }
    }

    return [x, y];
};

export const countDotsAfterFirstFold = (input: string) => {
    const lines = input.split('\n');
    const instructionsAfterIndex = lines.indexOf('');

    // First instruction
    const [axis, value] = lines[instructionsAfterIndex + 1]
        .split(' ')[2]
        .split('=');

    const uniqueDots = new Set<string>();
    for (let i = 0; i < instructionsAfterIndex; i++) {
        let [x, y] = lines[i].split(',').map(Number);

        // dots will never appear on the fold line
        [x, y] = positionAfterFold(axis, Number(value), x, y);

        uniqueDots.add(`${x},${y}`);
    }

    return uniqueDots.size;
};

export const revealLetterCode = (input: string) => {
    const lines = input.split('\n');
    const instructionsAfterIndex = lines.indexOf('');
    const dots = lines.slice(0, instructionsAfterIndex);
    const instructions = lines.slice(instructionsAfterIndex + 1);

    const getAxisAndValue = (fold: string) => fold.split(' ')[2].split('=');

    let uniqueDots = new Set<string>(dots);

    for (const fold of instructions) {
        let updatedDots = new Set<string>();
        const [axis, value] = getAxisAndValue(fold);

        for (const dot of uniqueDots) {
            const [originalX, originalY] = dot.split(',').map(Number);
            const [newX, newY] = positionAfterFold(
                axis,
                Number(value),
                originalX,
                originalY,
            );

            updatedDots.add(`${newX},${newY}`);
        }
        uniqueDots = updatedDots;
    }

    // maybe not the best in terms of time/space complexity...
    let maxX = 0;
    let maxY = 0;
    for (const dot of uniqueDots) {
        const [x, y] = dot.split(',').map(Number);
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }

    // prepare all possible plots with '.'
    let code: string[][] = [];
    for (let i = 0; i <= maxY; i++) {
        code.push(Array(maxX + 1).fill('.'));
    }

    // update plots where there is a dot (draw code)
    for (const dot of uniqueDots) {
        const [x, y] = dot.split(',').map(Number);
        code[y][x] = '#';
    }

    // convert to human readable format
    const codeToSring = '\n' + code.map((row) => row.join('') + '\n').join('');
    return codeToSring;
};
