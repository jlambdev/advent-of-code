import { largeInput, mediumInput, smallInput, puzzleInput } from '../fixtures';
import { countPathsSingleSmallCaveVisit } from '../paths';

describe('Passage Pathing', () => {
    it('should find the number of paths that visit small caves a maximum of 1 time', () => {
        expect(countPathsSingleSmallCaveVisit(smallInput)).toStrictEqual(10);
        expect(countPathsSingleSmallCaveVisit(mediumInput)).toStrictEqual(19);
        expect(countPathsSingleSmallCaveVisit(largeInput)).toStrictEqual(226);
        expect(countPathsSingleSmallCaveVisit(puzzleInput)).toStrictEqual(5958);
    });
});
