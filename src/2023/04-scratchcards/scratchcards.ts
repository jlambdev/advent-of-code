function getIntersection(left: Array<number>, right: Array<number>): Array<number> {
    return left.filter((x) => right.includes(x));
}

function getCards(input: string): Array<{
    winningNumbers: Array<number>;
    guessedNumbers: Array<number>;
    copies: number;
}> {
    return input.split('\n').map((line: string) => {
        const [idUnparsed, sections] = line.split(': ');
        const [winningNumbers, guessedNumbers] = sections.split(' | ').map((numbers) => {
            return numbers
                .split(' ')
                .filter((number) => !!number)
                .map(Number);
        });
        return { winningNumbers, guessedNumbers, copies: 1 };
    });
}

export function partOne(input: string): number {
    const cards = getCards(input);

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

export function partTwo(input: string): number {
    const cards = getCards(input);

    let totalCopies = 0;
    for (let i = 0; i < cards.length; i++) {
        totalCopies += cards[i].copies;
        const numMatches = getIntersection(
            cards[i].winningNumbers,
            cards[i].guessedNumbers,
        ).length;

        for (let j = 0; j < cards[i].copies; j++) {
            for (let k = 1; k <= numMatches; k++) {
                cards[i + k].copies++;
            }
        }
    }

    return totalCopies;
}
