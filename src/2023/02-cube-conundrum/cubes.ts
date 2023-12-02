export function partOne(input: string): number {
    const limits = {
        red: 12,
        green: 13,
        blue: 14,
    } as const;

    let sum = 0;
    input.split('\n').forEach((game: string) => {
        const [header, unparsedSets] = game.split(': ');
        const id = Number(header.match(/\d+/)![0]);

        const gameWithinLimits = unparsedSets.split('; ').every((set: string) => {
            return set.split(', ').every((colourCubes) => {
                const [quantity, colour] = colourCubes.split(' ');
                return Number(quantity) <= limits[colour as keyof typeof limits];
            });
        });

        if (gameWithinLimits) {
            sum += id;
        }
    });

    return sum;
}

function setMinCubes(currentMin: number, quantity: string): number {
    return Number(quantity) > currentMin ? Number(quantity) : currentMin;
}

export function partTwo(input: string): number {
    const powers = input.split('\n').map((game: string) => {
        const [, unparsedSets] = game.split(': ');

        let minRed = 0;
        let minGreen = 0;
        let minBlue = 0;

        unparsedSets.split('; ').forEach((set: string) => {
            set.split(', ').forEach((cubes) => {
                const [quantity, colour] = cubes.split(' ');
                if (colour === 'red') {
                    minRed = setMinCubes(minRed, quantity);
                } else if (colour === 'green') {
                    minGreen = setMinCubes(minGreen, quantity);
                } else if (colour === 'blue') {
                    minBlue = setMinCubes(minBlue, quantity);
                }
            });
        });

        return minRed * minGreen * minBlue;
    });

    return powers.reduce((total, current) => (total += current), 0);
}
