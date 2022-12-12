import { smallInput, puzzleInput } from '../fixture';
import { checksum } from '../inventory';

describe('Inventory Management System', () => {
    it('should identify the checksum for a list of box IDs', () => {
        expect(checksum(smallInput)).toStrictEqual(12);
        expect(checksum(puzzleInput)).toStrictEqual(6972);
    });
});
