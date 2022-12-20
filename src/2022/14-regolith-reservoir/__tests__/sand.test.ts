import { puzzleInput, smallInput } from '../fixture';
import { unitsOfSandThatRest } from '../sand';

describe('Regolith Reservoir', () => {
    it('should identify the number of units of sand that come to rest (abyss)', () => {
        expect(unitsOfSandThatRest(smallInput)).toStrictEqual(24);
        expect(unitsOfSandThatRest(puzzleInput)).toStrictEqual(614);
    });

    it('should identify the number of units of sand that come to rest (floor)', () => {
        expect(unitsOfSandThatRest(smallInput, true)).toStrictEqual(93);
        expect(unitsOfSandThatRest(puzzleInput, true)).toStrictEqual(23404); // too low
    });
});
