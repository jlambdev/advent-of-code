export const countEasyDigits = (input: string) => {
    const lines = input.split('\n');

    const easyDigitSignalLengths = new Set([2, 3, 4, 7]);
    let instancesOfEasyDigits = 0;

    for (const line of lines) {
        const [_, numbers] = line.split(' | ').map((x) => x.split(' '));

        numbers.forEach((number) => {
            if (easyDigitSignalLengths.has(number.length))
                instancesOfEasyDigits++;
        });
    }

    return instancesOfEasyDigits;
};

export const getProductOfAllNumbers = (input: string) => {
    const lines = input.split('\n');

    const charArray = (strArr: string[]) => strArr[0].split('');

    // Had to check Stack Overflow :/
    // https://stackoverflow.com/questions/8699357/finding-items-that-appear-only-one-time-in-a-javascript-array
    const singleOccuringChars = (charArr: string[]) => {
        let singles = [];
        for (let i = 0; i < charArr.length; i++) {
            if (
                charArr.indexOf(charArr[i], charArr.indexOf(charArr[i]) + 1) ==
                -1
            )
                singles.push(charArr[i]);
        }
        return singles;
    };

    // Segments are ordered 0-6 from top-left to bottom-right
    const signalsToSegmentMap = (signals: string[]): Map<string, number> => {
        const map = new Map<string, number>();

        // len 2; val 1; idxs 2-5
        // len 3; val 7; idxs 0-2-5                         -> found [0]
        // len 4; val 4; idxs 1-2-3-5                       -> found [0]
        // len 7; val 8; all idxs

        const one = charArray(signals.filter((x) => x.length === 2)); // segments 2,5
        const seven = charArray(signals.filter((x) => x.length === 3)); // segments 0,2,5
        const four = charArray(signals.filter((x) => x.length === 4)); // segments 1,2,3,5

        const segmentZero = seven.filter((x) => !one.includes(x))[0]; // Difference
        map.set(segmentZero, 0);

        // len 5; val 2; idxs 0-2-3-4-6 (idx 4 unique)      -> found [0,4]
        // len 5; val 5; idxs 0-1-3-5-6 (idx 1 unique)      -> found [0,1,4]
        // len 5; val 3; idxs 0-2-3-5-6                     -> no change

        // 1,4 are the segments that only occur 1 time for display numbers 2, 3 and 5
        const segmentsForTwoThreeFive = signals
            .filter((x) => x.length === 5)
            .reduce((a, x) => a.concat(x.split('')), []);
        const segmentsOneOrFour = singleOccuringChars(segmentsForTwoThreeFive);

        const segmentOne = segmentsOneOrFour.filter((x) => four.includes(x))[0]; // Intersection
        const segmentFour = segmentsOneOrFour.filter(
            (x) => ![segmentOne].includes(x),
        )[0]; // Difference

        // found [0,1,4]

        // len 6; val 6; idxs 0-1-3-4-5-6 (idx 2 is missing) -> found [0,1,2,4]
        // len 6; val 9; idxs 0-1-2-3-5-6 (idx 4 is missing) -> no change
        // len 6; val 0; idxs 0-1-2-4-5-6 (idx 3 is missing) -> found [0,1,2,3,4]

        const segmentsForZeroSixNine = signals
            .filter((x) => x.length === 6)
            .reduce((a, x) => a.concat(x.split('')), []);
        // this doesn't work - we're also only looking for twice ocurring characters
        const segmentsTwoThreeOrFour = singleOccuringChars(
            segmentsForZeroSixNine,
        );

        // get idx 6 by removing those not present in found from val 2 -> [0,1,2,3,4,6]
        // get idx 5 by removing the value not present in found from 1 -> [0,1,2,3,4,5,6]

        // Debugging
        console.log({
            one,
            seven,
            four,
            segmentZero,
            segmentsForTwoThreeFive,
            segmentsOneOrFour,
            segmentOne,
            segmentFour,
            segmentsForZeroSixNine,
            segmentsTwoThreeOrFour,
        });

        // 2. store character to segment index in a map

        /*
            {
                'd': 0,
                'e': 1,
                'a': 2,
                'f': 3,
                'g': 4,
                'b': 5,
                'c': 6
            }
        */

        return map;
    };

    // 3. convert string-number to display number using charSegMap

    // 'flip' the bit for the display number
    // join array into single string so it can be quickly compared by value

    // 4. store this in a different (?) map? display number to number

    /*
    const mapSignals = (signals: string[]): Map<string, number> => {
        const lookup = new Map<string, number>();
        const remaining = [];

        signals.forEach((signal) => {
            const { length } = signal;
            if (length === 2) lookup.set(signal, 1);
            if (length === 3) lookup.set(signal, 7);
            if (length === 4) lookup.set(signal, 4);
            if (length === 7) lookup.set(signal, 8);
            remaining.push(signal);
        });

        return lookup;
    };
    */

    let product = 1;

    for (const line of lines) {
        const [signals, numbers] = line.split(' | ').map((x) => x.split(' '));
        const lookup = signalsToSegmentMap(signals);

        // PROBLEM: the number string isn't in the same char order as signal

        // Debugging
        console.log({ lookup });
    }

    return product;
};
