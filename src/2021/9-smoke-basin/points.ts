export const sumRiskLevelsForLowPoints = (input: string) => {
    const rows = input.split('\n');

    const isLowerThan = (value: string, rowIdx: number, colIdx: number) => {
        if (!rows[rowIdx] || !rows[rowIdx][colIdx]) return true;
        return Number(value) < Number(rows[rowIdx][colIdx]); // just take care of parsing here
    };

    let riskLevelSum = 0;
    rows.forEach((row, rowIdx) => {
        const locations = row.split('');
        locations.forEach((location, colIdx) => {
            const isLowPoint =
                isLowerThan(location, rowIdx - 1, colIdx) && // check up
                isLowerThan(location, rowIdx + 1, colIdx) && // check down
                isLowerThan(location, rowIdx, colIdx - 1) && // check left
                isLowerThan(location, rowIdx, colIdx + 1); // check right

            if (isLowPoint) {
                riskLevelSum += 1 + Number(location);
            }
        });
    });

    return riskLevelSum;
};

export const productOfThreeLargestBasins = (input: string) => {
    let product = 1;

    return product;
};
