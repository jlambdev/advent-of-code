import { partOne, partTwo } from './mapping';
import { smallInput, puzzleInput } from './input';

describe('If You Give A Seed A Fertilizer', () => {
    it('can identify the lowest location number for all seeds', () => {
        expect(partOne(smallInput)).toStrictEqual(35);
        expect(partOne(puzzleInput)).toStrictEqual(457535844);
    });

    it.skip('TODO', () => {
        expect(partTwo(smallInput)).toStrictEqual(46);
        // expect(partTwo(puzzleInput)).toStrictEqual(0);
    });
});
