export enum Score {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPair = 3,
    OnePair = 2,
    HighCard = 1,
}

function getCharacterCounts(hand: string): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    for (const char of hand) {
        if (char in counts) {
            counts[char]++;
        } else {
            counts[char] = 1;
        }
    }
    return counts;
}

export function getHandStrength(hand: string, joker: boolean = false): number {
    const counts = getCharacterCounts(hand);
    const jCardCount = counts['J'];
    const numDifferentChars = Object.keys(counts).length;

    if (numDifferentChars === 1) {
        return Score.FiveOfAKind;
    }

    if (numDifferentChars === 2) {
        const isFourOfAKind = Object.values(counts).some((count) => count === 4);
        if (joker && jCardCount >= 1 && jCardCount <= 4) {
            return Score.FiveOfAKind;
        }
        return isFourOfAKind ? Score.FourOfAKind : Score.FullHouse;
    }

    if (numDifferentChars === 3) {
        const isThreeOfAKind = Object.values(counts).some((count) => count === 3);
        if (joker) {
            if (isThreeOfAKind && jCardCount) {
                return Score.FourOfAKind;
            } else {
                if (jCardCount === 2) {
                    return Score.FourOfAKind;
                } else if (jCardCount === 1) {
                    return Score.FullHouse;
                }
            }
        }
        return isThreeOfAKind ? Score.ThreeOfAKind : Score.TwoPair;
    }

    if (numDifferentChars === 4) {
        if (joker && jCardCount) {
            return Score.ThreeOfAKind;
        }
        return Score.OnePair;
    }

    if (joker && jCardCount === 1) {
        return Score.OnePair;
    }
    return Score.HighCard;
}

function getCardStrength(card: string, joker: boolean = false): number {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return joker ? 1 : 11;
        case 'T':
            return 10;
        default:
            return Number(card);
    }
}

function getTotalWinnings(rankedHands: Array<Array<string>>): number {
    return rankedHands.reduce((sum, [_, bid], index) => {
        return (sum += Number(bid) * (index + 1));
    }, 0);
}

function makeComparator(
    joker: boolean = false,
): (left: [string, string], right: [string, string]) => number {
    return (left: [string, string], right: [string, string]) => {
        const leftHandStrength = getHandStrength(left[0], joker);
        const rightHandStrength = getHandStrength(right[0], joker);
        if (leftHandStrength !== rightHandStrength) {
            return leftHandStrength - rightHandStrength;
        }

        for (let i = 0; i < left[0].length; i++) {
            const leftCardStrength = getCardStrength(left[0][i], joker);
            const rightCardStrength = getCardStrength(right[0][i], joker);
            if (leftCardStrength !== rightCardStrength) {
                return leftCardStrength - rightCardStrength;
            }
        }

        return 0;
    };
}

export function partOne(input: string): number {
    // highest ranking card is at the *end* of the array (ascending order)
    const ranked = input
        .split('\n')
        .map((line: string) => line.split(' '))
        .sort(makeComparator());

    return getTotalWinnings(ranked);
}

export function partTwo(input: string): number {
    const joker = true;
    const ranked = input
        .split('\n')
        .map((line: string) => line.split(' '))
        .sort(makeComparator(joker));

    return getTotalWinnings(ranked);
}
