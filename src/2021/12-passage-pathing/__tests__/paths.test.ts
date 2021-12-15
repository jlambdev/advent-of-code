import { largeInput, mediumInput, smallInput, puzzleInput } from '../fixtures';
import { countPaths } from '../paths';

describe('Passage Pathing', () => {
    it('should find the number of paths that visit small caves a maximum of 1 time', () => {
        expect(countPaths(smallInput)).toStrictEqual(10);
        expect(countPaths(mediumInput)).toStrictEqual(19);
        expect(countPaths(largeInput)).toStrictEqual(226);
        expect(countPaths(puzzleInput)).toStrictEqual(5958);
    });

    it('should find the number of paths, including a one-time double small cave visit', () => {
        expect(countPaths(smallInput, true)).toStrictEqual(36);
        expect(countPaths(mediumInput, true)).toStrictEqual(103);
        expect(countPaths(largeInput, true)).toStrictEqual(3509);
        expect(countPaths(puzzleInput, true)).toStrictEqual(150426);
    });
});
