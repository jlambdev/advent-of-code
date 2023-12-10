import { partOne, partTwo } from './history';
import { smallInput, puzzleInput } from './input';

describe('Mirage Maintenance', () => {
    it('can sum all extrapolated (next) values for all value histories', () => {
        expect(partOne(smallInput)).toStrictEqual(114);
        expect(partOne(puzzleInput)).toStrictEqual(2043183816);
    });

    it('can sum of left-most extrapolated values', () => {
        expect(partTwo(smallInput)).toStrictEqual(2);
        expect(partTwo(puzzleInput)).toStrictEqual(1118);
    });
});
