export function sumFrequencies(input: string): number {
    return input.split('\n').reduce((acc, line) => {
        const operand = line[0];
        const change = Number(line.substring(1));
        return operand === '+' ? (acc += change) : (acc -= change);
    }, 0);
}

export function firstDuplicateFrequency(input: string): number {
    const frequencies = input
        .split('\n')
        .map((line) => [line[0], Number(line.substring(1))] as const);

    const seenFrequencies = new Set<number>();

    let lineNumber = 0;
    let frequency = 0;

    while (!seenFrequencies.has(frequency)) {
        seenFrequencies.add(frequency);
        const [operand, change] = frequencies[lineNumber];
        frequency = operand === '+' ? frequency + change : frequency - change;
        lineNumber = (lineNumber + 1) % frequencies.length;
    }

    return frequency;
}
