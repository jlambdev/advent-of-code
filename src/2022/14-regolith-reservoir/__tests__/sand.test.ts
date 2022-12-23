import { puzzleInput, smallInput } from '../fixture';
import { numRestingSandUnitsWithAbyss, numRestingSandUnitsWithFloor } from '../sand';

describe('Regolith Reservoir', () => {
    it('should identify the number of units of sand that come to rest (abyss)', () => {
        expect(numRestingSandUnitsWithAbyss(smallInput)).toStrictEqual(24);
        expect(numRestingSandUnitsWithAbyss(puzzleInput)).toStrictEqual(614);
    });

    it('should identify the number of units of sand that come to rest (floor)', () => {
        expect(numRestingSandUnitsWithFloor(smallInput)).toStrictEqual(93);
        expect(numRestingSandUnitsWithFloor(puzzleInput)).toStrictEqual(26170); // 23404 too low
    });
});
