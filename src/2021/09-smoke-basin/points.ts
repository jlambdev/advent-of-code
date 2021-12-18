const isLowerThan = (
    rows: string[],
    value: string,
    rowIdx: number,
    colIdx: number,
) => {
    if (!rows[rowIdx] || !rows[rowIdx][colIdx]) return true;
    return Number(value) < Number(rows[rowIdx][colIdx]);
};

const isLowPoint = (
    rows: string[],
    value: string,
    rowIdx: number,
    colIdx: number,
) => {
    return (
        isLowerThan(rows, value, rowIdx - 1, colIdx) && // check up
        isLowerThan(rows, value, rowIdx + 1, colIdx) && // check down
        isLowerThan(rows, value, rowIdx, colIdx - 1) && // check left
        isLowerThan(rows, value, rowIdx, colIdx + 1) // check right
    );
};

export const sumRiskLevelsForLowPoints = (input: string) => {
    const rows = input.split('\n');

    let riskLevelSum = 0;
    rows.forEach((row, rowIdx) => {
        row.split('').forEach((location, colIdx) => {
            if (isLowPoint(rows, location, rowIdx, colIdx)) {
                riskLevelSum += 1 + Number(location);
            }
        });
    });

    return riskLevelSum;
};

export const productOfThreeLargestBasins = (input: string) => {
    const rows = input.split('\n');
    const checkedLocations = new Set<string>(); // '4,5'
    const basins = new Map<string, number>();

    const recurseToBasinEdge = (
        rowIdx: number,
        colIdx: number,
        basinRoot?: string,
    ): number => {
        // base cases
        if (
            !rows[rowIdx] ||
            !rows[rowIdx][colIdx] ||
            Number(rows[rowIdx][colIdx]) === 9
        )
            return;
        const key = `${rowIdx},${colIdx}`;
        if (checkedLocations.has(key)) return;

        checkedLocations.add(key);
        if (!basinRoot) basins.set(key, 1);
        else basins.set(basinRoot, basins.get(basinRoot) + 1);

        const root = basinRoot ?? key;

        recurseToBasinEdge(rowIdx - 1, colIdx, root); // check up
        recurseToBasinEdge(rowIdx + 1, colIdx, root); // check down
        recurseToBasinEdge(rowIdx, colIdx - 1, root); // check left
        recurseToBasinEdge(rowIdx, colIdx + 1, root); // check right
    };

    rows.forEach((row, rowIdx) => {
        row.split('').forEach((location, colIdx) => {
            if (isLowPoint(rows, location, rowIdx, colIdx)) {
                recurseToBasinEdge(rowIdx, colIdx);
            }
        });
    });

    // not the nicest solution
    const sortedBasinSizes = [];
    for (const [_, size] of basins) {
        sortedBasinSizes.push(size);
    }
    sortedBasinSizes.sort((a, b) => b - a);

    // Debugging
    // console.log({ checkedLocations, basins, sortedBasinSizes });

    return sortedBasinSizes[0] * sortedBasinSizes[1] * sortedBasinSizes[2];
};
