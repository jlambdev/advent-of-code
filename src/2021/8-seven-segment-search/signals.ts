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
        // TODO: refactor this and remove duplication ( use map )
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
            .reduce((a, x) => {
                x.split('').forEach((y) => {
                    if (!a.has(y)) a.set(y, 1);
                    else a.set(y, a.get(y) + 1);
                });
                return a;
            }, new Map<string, number>());

        const segmentsTwoThreeOrFour: string[] = [];
        for (const [key, value] of segmentsForZeroSixNine) {
            if (value === 2) segmentsTwoThreeOrFour.push(key);
        }

        // got [2,3,4] in any order --> know [0, 1, 4]

        // get 2 by getting the intersection of [2,3,4] and [2,5]
        const segmentTwo = segmentsTwoThreeOrFour.filter((x) =>
            one.includes(x),
        )[0]; // Intersection

        // found [0,1,2,4] -> get 3 by getting the difference of [2,3,4] and found
        const segmentThree = segmentsTwoThreeOrFour.filter(
            (x) => ![segmentTwo, segmentFour].includes(x),
        )[0]; // Difference

        // find final segment

        // len 5; val 2; idxs 0-2-3-4-6 (idx 4 unique)      -> found [0,4]
        // len 5; val 5; idxs 0-1-3-5-6 (idx 1 unique)      -> found [0,1,4]
        // len 5; val 3; idxs 0-2-3-5-6                     -> no change

        const segmentsForZeroSixNineMapRefactorMe = signals
            .filter((x) => x.length === 5)
            .reduce((a, x) => {
                x.split('').forEach((y) => {
                    if (!a.has(y)) a.set(y, 1);
                    else a.set(y, a.get(y) + 1);
                });
                return a;
            }, new Map<string, number>());

        const segmentsTwoOrFive: string[] = [];
        const segmentsZeroThreeOrSix: string[] = [];
        for (const [key, value] of segmentsForZeroSixNineMapRefactorMe) {
            if (value === 2) segmentsTwoOrFive.push(key);
            if (value === 3) segmentsZeroThreeOrSix.push(key);
        }

        const segmentFive = segmentsTwoOrFive.filter(
            (x) => ![segmentTwo].includes(x),
        )[0]; // Difference
        const segmentSix = segmentsZeroThreeOrSix.filter(
            (x) => ![segmentZero, segmentThree].includes(x),
        )[0]; // Difference

        // Debugging
        // console.log({
        //     // one,
        //     // seven,
        //     // four,
        //     segmentZero,
        //     // segmentsForTwoThreeFive,
        //     // segmentsOneOrFour,
        //     segmentOne,
        //     segmentTwo,
        //     segmentThree,
        //     segmentFour,
        //     // segmentsForZeroSixNine,
        //     // segmentsTwoThreeOrFour,
        //     // segmentsForZeroSixNineMapRefactorMe,
        //     segmentFive,
        //     segmentSix,
        // });

        /*
            2. store character to segment index in a map. For example:

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
        map.set(segmentZero, 0);
        map.set(segmentOne, 1);
        map.set(segmentTwo, 2);
        map.set(segmentThree, 3);
        map.set(segmentFour, 4);
        map.set(segmentFive, 5);
        map.set(segmentSix, 6);

        return map;
    };

    // 3. convert string-number to display number using charSegMap
    const convertSignalToDisplayNumber = (
        segmentMap: Map<string, number>,
        signal: string,
    ): string => {
        const litDisplaySegments = [0, 0, 0, 0, 0, 0, 0];

        // 'flip' the bit for the display number
        for (const char of signal) {
            litDisplaySegments[segmentMap.get(char)] = 1;
        }

        // join array into single string so it can be quickly compared by value
        return litDisplaySegments.join('');
    };

    // 4. store this in a different (?) map? display number to number
    const signalsToDisplayNumberMap = (
        signals: string[],
        segmentMap: Map<string, number>,
    ): Map<string, string> => {
        const map = new Map<string, string>();

        for (const signal of signals) {
            map.set(signal, convertSignalToDisplayNumber(segmentMap, signal));
        }

        return map;
    };

    // 5. convert signal-number into actual number
    const displayNumberToRealNumberMap = new Map<string, string>([
        ['1110111', '0'],
        ['0010010', '1'],
        ['1011101', '2'],
        ['1011011', '3'],
        ['0111010', '4'],
        ['1101011', '5'],
        ['1101111', '6'],
        ['1010010', '7'],
        ['1111111', '8'],
        ['1111011', '9'],
    ]);
    const convertInputNumberToRealNumber = (
        segmentMap: Map<string, number>,
        signal: string,
    ): string => {
        const displayNumber = convertSignalToDisplayNumber(segmentMap, signal);
        return displayNumberToRealNumberMap.get(displayNumber);
    };

    const joinInputNumbers = (
        segmentMap: Map<string, number>,
        inputNumbers: string[],
    ): number => {
        const num = inputNumbers.reduce((pre, cur) => {
            return (pre += convertInputNumberToRealNumber(segmentMap, cur));
        }, '');
        return Number(num);
    };

    let sum = 0;

    for (const line of lines) {
        const [signals, numbers] = line.split(' | ').map((x) => x.split(' '));
        const segmentMap = signalsToSegmentMap(signals);
        const displayNumberMap = signalsToDisplayNumberMap(signals, segmentMap);

        sum += joinInputNumbers(segmentMap, numbers);

        // Debugging
        console.log({ segmentMap, displayNumberMap });
    }

    return sum;
};
