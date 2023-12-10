import { partOne } from './pipes';
import { sampleOne, sampleTwo, puzzleInput } from './input';

describe('Pipe Maze', () => {
    it('can sum all extrapolated (next) values for all value histories', () => {
        expect(partOne(sampleOne)).toStrictEqual(4);
        expect(partOne(sampleTwo)).toStrictEqual(8);
        expect(partOne(puzzleInput)).toStrictEqual(6786);
    });
});
