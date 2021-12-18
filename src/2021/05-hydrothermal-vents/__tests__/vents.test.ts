import { coordinates, smallInput } from '../fixtures';
import { findOverlappingVents } from '../vents';

describe('Vents', () => {
    it('should identify the number of overlapping vents', () => {
        expect(findOverlappingVents(coordinates, false)).toStrictEqual(4728);
    });

    it('should support diagonal lines', () => {
        expect(findOverlappingVents(smallInput, true)).toStrictEqual(12);
        // 13294 is too low
        // 16459 is too low
        expect(findOverlappingVents(coordinates, true)).toStrictEqual(17717);
    });
});
