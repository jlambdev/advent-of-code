export const findSumTwoNumbers = (report: string) => {
    const numbers = new Set(report.split('\n').map(Number));
    const iter = numbers.values();

    let product: number;
    let candidate = iter.next().value;

    while (candidate) {
        const opposite = 2020 - candidate;
        if (numbers.has(opposite)) {
            product = candidate * opposite;
            candidate = undefined;
        } else {
            numbers.delete(candidate);
            candidate = iter.next().value;
        }
    }

    return product;
};

export const findSumThreeNumbers = (report: string) => {
    // consider sorting the list of numbers
    const sortedNumbers = report
        .split('\n')
        .map(Number)
        .sort((a, b) => a - b);

    // method to do above set-check
    const findCandidates = (candidates: Set<number>, base: number) => {
        const iter = candidates.values();
        let candidate = iter.next().value;

        while (candidate) {
            const opposite = base - candidate;
            if (candidates.has(opposite)) {
                return [candidate, opposite];
            }
            candidates.delete(candidate);
            candidate = iter.next().value;
        }
    };

    let product: number;
    for (const number of sortedNumbers) {
        const rest = findCandidates(
            new Set(sortedNumbers.slice(sortedNumbers.indexOf(number))),
            2020 - number,
        );

        if (rest && rest[0] && rest[1]) {
            product = number * rest[0] * rest[1];
        }
    }

    return product;
};
