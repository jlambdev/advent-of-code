function getIntersection(left: Array<number>, right: Array<number>): Array<number> {
    return left.filter((x) => right.includes(x));
}

export function partOne(input: string): number {
    const cards = input.split('\n').map((line: string) => {
        const [, sections] = line.split(': ');
        const [winningNumbers, guessedNumbers] = sections.split(' | ').map((numbers) => {
            return numbers
                .split(' ')
                .filter((number) => !!number)
                .map(Number);
        });
        return { winningNumbers, guessedNumbers };
    });

    const points = cards.map(({ winningNumbers, guessedNumbers }) => {
        const numMatches = getIntersection(winningNumbers, guessedNumbers).length;
        let points = numMatches > 0 ? 1 : 0;
        for (let i = 1; i < numMatches; i++) {
            points *= 2;
        }
        return points;
    });

    return points.reduce((total, current) => (total += current), 0);
}
