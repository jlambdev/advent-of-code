import { sampleOne, sampleTwo, sampleThree, puzzleInput } from './input';
import { partOne } from './wires';

describe('Crossed Wires', () => {
    it('should identify the manhattan distance of the nearest wire crossing', () => {
        expect(partOne(sampleOne)).toStrictEqual(6);
        // expect(partOne(sampleTwo)).toStrictEqual(159);  🔥
        // expect(partOne(sampleThree)).toStrictEqual(0);
        // expect(partOne(puzzleInput)).toStrictEqual(0);
    });
});
