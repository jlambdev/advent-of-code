function predictNextValue(numbers: Array<number>): number {
    if (numbers.every((n) => n === 0)) {
        return 0;
    }

    const differences: Array<number> = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        differences.push(numbers[i + 1] - numbers[i]);
    }
    return numbers[numbers.length - 1] + predictNextValue(differences);
}

export function partOne(input: string): number {
    const histories = input
        .split('\n')
        .map((line: string) => line.split(' ').map(Number));

    return histories.reduce((sum, history) => (sum += predictNextValue(history)), 0);
}

export function partTwo(input: string): number {
    const histories = input
        .split('\n')
        .map((line: string) => line.split(' ').map(Number).reverse());

    return histories.reduce((sum, history) => (sum += predictNextValue(history)), 0);
}
