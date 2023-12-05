import { puzzleInput } from './input';
import { partOne } from './polymers';

describe('Alchemical Reduction', () => {
    it('should identify the polymer length after reactions', () => {
        expect(partOne('dabAcCaCBAcCcaDA')).toStrictEqual(10);
        expect(partOne(puzzleInput)).toStrictEqual(11636);
    });
});
