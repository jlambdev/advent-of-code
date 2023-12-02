export function hasExactlyTwoOrThreeUniqueLetters(boxId: string): [boolean, boolean] {
    const alphabet = [...Array(26)].map((_) => 0);
    for (let i = 0; i < boxId.length; i++) {
        const ascii = boxId.charCodeAt(i) - 97;
        alphabet[ascii]++;
    }
    return [alphabet.some((count) => count === 2), alphabet.some((count) => count === 3)];
}

export function checksum(input: string): number {
    let totalWithTwoLetters = 0;
    let totalWithThreeLetters = 0;

    input.split('\n').forEach((line) => {
        const [hasTwoUnique, hasThreeUnique] = hasExactlyTwoOrThreeUniqueLetters(line);
        if (hasTwoUnique) {
            totalWithTwoLetters++;
        }
        if (hasThreeUnique) {
            totalWithThreeLetters++;
        }
    });

    return totalWithTwoLetters * totalWithThreeLetters;
}

export function twoClosestBoxes(input: string): string {
    const lines = input.split('\n').sort();

    for (let i = 0, j = 1; j < lines.length; i++, j++) {
        let differentLetters: Array<string> = [];
        for (let charIndex = 0; charIndex < lines[i].length; charIndex++) {
            if (lines[i][charIndex] !== lines[j][charIndex]) {
                differentLetters.push(lines[i][charIndex]);
            }
        }

        // We assume that the closest IDs will have a 1 letter difference
        if (differentLetters.length === 1) {
            return lines[i].replace(differentLetters[0], '');
        }
    }

    throw new Error('Closest 2 IDs were not identified');
}
