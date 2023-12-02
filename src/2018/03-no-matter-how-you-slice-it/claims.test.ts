import { smallInput, puzzleInput } from './input';
import { partOne, partTwo } from './claims';

describe('No Matter How You Slice It', () => {
    it('should identify the number of overlapping squares from claims', () => {
        expect(partOne(smallInput)).toStrictEqual(4);
        expect(partOne(puzzleInput)).toStrictEqual(110546);
    });

    it('should identify the ID of the only non-overlapping claim', () => {
        expect(partTwo(smallInput)).toStrictEqual('3');
        expect(partTwo(puzzleInput)).toStrictEqual('819');
    });
});
