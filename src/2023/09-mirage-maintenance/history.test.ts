import { partOne } from './history';
import { smallInput, puzzleInput } from './input';

describe('Mirage Maintenance', () => {
    it('can sum all extrapolated (next) values for all value histories', () => {
        expect(partOne(smallInput)).toStrictEqual(114);
        // expect(partOne(puzzleInput)).toStrictEqual(0);
    });
});
