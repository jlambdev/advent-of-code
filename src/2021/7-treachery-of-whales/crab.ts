export const leastFuelConstantCost = (input: string) => {
    const crabs = input.split(',').map(Number);

    // Position 0 is always present in the data
    const max = Math.max(...crabs);
    const fuelForPosition = Array(max).fill(0);

    for (const crab of crabs) {
        for (let position = 0; position < fuelForPosition.length; position++) {
            fuelForPosition[position] += Math.abs(position - crab);
        }
    }

    return Math.min(...fuelForPosition);
};

export const leastFuelIncreasingCost = (input: string) => {
    const crabs = input.split(',').map(Number);

    // 1, 3, 6, 10, 15, 21, 28, 36
    // 1, 2, 3, 4,  5,  6,  7,  8
    const sumMemo = new Map<number, number>();
    const totalFuelCost = (distance: number): number => {
        if (sumMemo.has(distance)) return sumMemo.get(distance);
        const cost = Array(distance)
            .fill(0)
            .reduce((pre, _, idx) => {
                return pre + idx + 1;
            }, 0);
        sumMemo.set(distance, cost);
        return cost;
    };

    const max = Math.max(...crabs);
    const fuelForPosition = Array(max).fill(0);

    for (const crab of crabs) {
        for (let position = 0; position < fuelForPosition.length; position++) {
            const distance = Math.abs(position - crab);
            fuelForPosition[position] += totalFuelCost(distance);
        }
    }

    return Math.min(...fuelForPosition);
};
