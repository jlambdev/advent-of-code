import { partOne, partTwo } from './boats';
import { smallInput, puzzleInput } from './input';

describe('Wait For It', () => {
    it('can identify the number of ways to beat each race', () => {
        expect(partOne(smallInput)).toStrictEqual(288);
        expect(partOne(puzzleInput)).toStrictEqual(131376);
    });

    it('can identify the number of ways to beat a single long race', () => {
        expect(partTwo(smallInput)).toStrictEqual(71503);
        expect(partTwo(puzzleInput)).toStrictEqual(34123437);
    });
});
