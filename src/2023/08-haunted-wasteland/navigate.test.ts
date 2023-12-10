import { partOne, partTwo } from './navigate';
import { sampleOne, sampleTwo, sampleThree, puzzleInput } from './input';

describe('Haunted Wasteland', () => {
    it('can identify the number of steps to get from AAA to ZZZ', () => {
        expect(partOne(sampleOne)).toStrictEqual(2);
        expect(partOne(sampleTwo)).toStrictEqual(6);
        expect(partOne(puzzleInput)).toStrictEqual(19951);
    });

    it.skip('can simultaneously navigate nodes and identify steps until all on ZZZ', () => {
        expect(partTwo(sampleThree)).toStrictEqual(6);
        expect(partTwo(puzzleInput)).toStrictEqual(0); // ???
    });
});
