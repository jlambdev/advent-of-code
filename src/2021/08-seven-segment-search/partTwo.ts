import {
    charactersToSegmentIndexMap,
    getDifference,
    getIntersection,
    getSegmentDisplayOccurences,
    getSegmentsForNumbersOneFourSeven,
    joinInputNumbers,
} from './helpers';
import { SegmentMap } from './types';

/**
 * Create a mapping of signal characters to the segment
 * that will 'light up'. The order of segments is represented
 * as an array of 7 values. The index represents the position
 * of the segment, going from top-left to top-right. For example:
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
 *
 * To _try_ and improve readability, display numbers (consisting of segments)
 * are represented as words, such as 'zero', 'three' and 'six'. The segments
 * are represented as numbers, prefixed with 'seg', so 'seg0', 'seg1' etc.
 */
const buildSegmentMap = (signals: string[]): SegmentMap => {
    const [
        segmentsOfOne,
        segmentsOfFour,
        segmentsOfSeven,
    ] = getSegmentsForNumbersOneFourSeven(signals);

    const seg0 = getDifference(segmentsOfSeven, segmentsOfOne);

    const displayOccurencesForTwoThreeFive = getSegmentDisplayOccurences(
        signals,
        5,
    );
    const segs0or4: string[] = [];
    for (const [key, value] of displayOccurencesForTwoThreeFive) {
        if (value === 1) segs0or4.push(key);
    }

    const seg1 = getIntersection(segs0or4, segmentsOfFour);
    const seg4 = getDifference(segs0or4, [seg1]);

    const displayOccurencesForZeroSixNine = getSegmentDisplayOccurences(
        signals,
        6,
    );
    const segs2or3or4: string[] = [];
    for (const [key, value] of displayOccurencesForZeroSixNine) {
        if (value === 2) segs2or3or4.push(key);
    }

    const seg2 = getIntersection(segs2or3or4, segmentsOfOne);

    const seg3 = getDifference(segs2or3or4, [seg2, seg4]);

    const segs2or5: string[] = [];
    const segs0or3or6: string[] = [];
    for (const [key, value] of displayOccurencesForTwoThreeFive) {
        if (value === 2) segs2or5.push(key);
        if (value === 3) segs0or3or6.push(key);
    }

    const seg5 = getDifference(segs2or5, [seg2]);
    const seg6 = getDifference(segs0or3or6, [seg0, seg3]);

    return charactersToSegmentIndexMap(
        seg0,
        seg1,
        seg2,
        seg3,
        seg4,
        seg5,
        seg6,
    );
};

/**
 * Iterate through each line, build a segment map, interpret the
 * display numbers that are shown and return the sum of all
 * human-readable numbers.
 */
export const getProductOfAllNumbers = (input: string) => {
    const lines = input.split('\n');

    let sum = 0;

    for (const line of lines) {
        const [signals, numbers] = line.split(' | ').map((x) => x.split(' '));
        const segmentMap = buildSegmentMap(signals);

        sum += joinInputNumbers(segmentMap, numbers);
    }

    return sum;
};
