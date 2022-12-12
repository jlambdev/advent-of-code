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
