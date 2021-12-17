import { SegmentMap } from './types';

/**
 * We can easily identify the signals corresponding to Display numbers
 * 1, 4 or 7 based on the number of 'display segments' that are lit up.
 */
export const getSegmentsForNumbersOneFourSeven = (signals: string[]) => {
    const charArray = (strArr: string[]) => strArr[0].split('');

    const one = charArray(signals.filter((x) => x.length === 2)); // segments 2,5
    const four = charArray(signals.filter((x) => x.length === 4)); // segments 1,2,3,5
    const seven = charArray(signals.filter((x) => x.length === 3)); // segments 0,2,5

    return [one, four, seven];
};

/**
 * Get the difference between 2 arrays.
 *
 * This method assumes that there will be only 1 difference between
 * the two arrays, so it returns the first result of the difference ([0]).
 */
export const getDifference = (left: string[], right: string[]) => {
    return left.filter((x) => !right.includes(x))[0];
};

/**
 * Get the intersection of 2 arrays.
 *
 * This method assumes that there will be only 1 difference between
 * the two arrays, so it returns the first result of the difference ([0]).
 */
export const getIntersection = (left: string[], right: string[]) => {
    return left.filter((x) => right.includes(x))[0];
};

/**
 * Count the number of times a segment section is displayed for a set
 * of signals, filtered by signal length.
 *
 * We can use the signal length to more easily reason about which display
 * values we are working with. For example, we know that display values
 * 2, 3 and 5 each use 5 segment pieces to display the number.
 * Display values 0, 6 and 9 use 6 segment pieces.
 */
export const getSegmentDisplayOccurences = (
    signals: string[],
    signalLength: number,
): Map<string, number> => {
    return signals
        .filter((signal) => signal.length === signalLength)
        .reduce((map, signal) => {
            signal.split('').forEach((char) => {
                if (!map.has(char)) map.set(char, 1);
                else map.set(char, map.get(char) + 1);
            });
            return map;
        }, new Map<string, number>());
};

/**
 * Store character to segment index in a map. For example:
 *
 * {
 *   'd': 0,        0000          dddd
 *   'e': 1,  ->   1    2   ->   e    a
 *   'a': 2,       1    2        e    a
 *   'f': 3,  ->    3333    ->    ffff
 *   'g': 4,       4    5        g    b
 *   'b': 5,  ->   4    5   ->   g    b
 *   'c': 6         6666          cccc
 * }
 */
export const charactersToSegmentIndexMap = (
    ...characters: string[]
): SegmentMap => {
    const map = new Map<string, number>();

    characters.forEach((char, index) => map.set(char, index));

    return map;
};

/**
 * Check every character in the signal, look up the character
 * in the segment map, 'switch on' the segments in the display
 * and return the display number, represented as the segments
 * that are lit up. For example:
 *
 * - signal  --> 'adbfc'
 * - lookup  --> 'a': 0, 'd': 2, 'b': 3, 'f': 4, 'c': 6
 * - display --> [1, 0, 1, 1, 1, 0, 1]
 * - return  --> '1011101'
 */
export const convertSignalToDisplayNumber = (
    segmentMap: SegmentMap,
    signal: string,
): string => {
    const display = [0, 0, 0, 0, 0, 0, 0];
    for (const char of signal) {
        display[segmentMap.get(char)] = 1;
    }
    return display.join('');
};

/**
 * Mapping of display number (the 'lit' segments on the panel)
 * to human-readable number. Represented as strings here because
 * we will be concatinating these later anyway.
 */
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

/**
 * Using a segment map, convert an array of signals such as
 * ['fgae', 'cfgab', 'fg', 'bagce']
 * convert them to display numbers and identify the full
 * 'human readable' number that would be shown.
 */
export const joinInputNumbers = (
    segmentMap: SegmentMap,
    inputNumbers: string[],
): number => {
    const toRealNumber = (signal: string): string => {
        const displayNumber = convertSignalToDisplayNumber(segmentMap, signal);
        return displayNumberToRealNumberMap.get(displayNumber);
    };

    const num = inputNumbers.reduce((pre, cur) => {
        return (pre += toRealNumber(cur));
    }, '');

    return Number(num);
};
