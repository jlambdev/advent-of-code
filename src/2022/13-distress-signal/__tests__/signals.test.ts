import { smallInput, puzzleInput } from '../fixture';
import { sumOfIndicesOfPairsInCorrectOrder } from '../signals';

describe('Distress Signal', () => {
    it.skip('should return the sum of indices of pairs that are in the right order', () => {
        expect(sumOfIndicesOfPairsInCorrectOrder(smallInput)).toStrictEqual(13);
        // expect(sumOfIndicesOfPairsInCorrectOrder(puzzleInput)).toStrictEqual(1);
    });
});
