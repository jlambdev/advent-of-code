import { partOneSample, partTwoSample, puzzleInput } from './input';
import { checksum, twoClosestBoxes } from './inventory';

describe('Inventory Management System', () => {
    it('should identify the checksum for a list of box IDs', () => {
        expect(checksum(partOneSample)).toStrictEqual(12);
        expect(checksum(puzzleInput)).toStrictEqual(6972);
    });

    it('should identify the 2 closest box IDs', () => {
        expect(twoClosestBoxes(partTwoSample)).toStrictEqual('fgij');
        expect(twoClosestBoxes(puzzleInput)).toStrictEqual('aixwcbzrmdvpsjfgllthdyoqe');
    });
});
