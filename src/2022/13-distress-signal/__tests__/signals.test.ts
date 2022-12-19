import { smallInput, puzzleInput } from '../fixture';
import {
    compare,
    findDecoderKey,
    parseLine,
    sumOfIndicesOfPairsInCorrectOrder,
} from '../signals';

describe('Distress Signal', () => {
    it('should parse lines into a `NumberArray` data structure', () => {
        expect(parseLine('[1,1,3,1,1]')).toStrictEqual([1, 1, 3, 1, 1]);
        expect(parseLine('[[1],[2,3,4]]')).toStrictEqual([[1], [2, 3, 4]]);
        expect(parseLine('[]')).toStrictEqual([]);
        expect(parseLine('[1,[2,[3,[4,[5,6,7]]]],8,9]')).toStrictEqual([
            1,
            [2, [3, [4, [5, 6, 7]]]],
            8,
            9,
        ]);
    });

    it('should compare left and right NumberArrays and determine if they are in order', () => {
        // Example scenarios in description
        expect(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toStrictEqual(1);
        expect(compare([[1], [2, 3, 4]], [[1], 4])).toStrictEqual(1);
        expect(compare([9], [[8, 7, 6]])).toStrictEqual(-1);
        expect(compare([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toStrictEqual(1);
        expect(compare([7, 7, 7, 7], [7, 7, 7])).toStrictEqual(-1);
        expect(compare([], [3])).toStrictEqual(1);
        expect(compare([[[]]], [[]])).toStrictEqual(-1);
        expect(
            compare(
                [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
            ),
        ).toStrictEqual(-1);
        // Additional scenarios
        expect(compare([2], [1])).toStrictEqual(-1);
        expect(
            compare(
                [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                [1, [2, [3, [4, [5, 6, 7]]]], 8, 7],
            ),
        ).toStrictEqual(-1);
    });

    it('should return the sum of indices of pairs that are in the right order', () => {
        expect(sumOfIndicesOfPairsInCorrectOrder(smallInput)).toStrictEqual(13);
        expect(sumOfIndicesOfPairsInCorrectOrder(puzzleInput)).toStrictEqual(5503);
    });

    it('should identify the decoder key for the distress signal', () => {
        expect(findDecoderKey(smallInput)).toStrictEqual(140);
        expect(findDecoderKey(puzzleInput)).toStrictEqual(20952);
    });
});
