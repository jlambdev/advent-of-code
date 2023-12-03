import { partOne, partTwo } from './parts';
import { smallInput, puzzleInput } from './input';

describe('Gear Ratios', () => {
    it('can identify and sum all the part numbers from the schematic', () => {
        expect(partOne(smallInput)).toStrictEqual(4361);
        expect(partOne(puzzleInput)).toStrictEqual(509115);
    });

    it('can identify and sum all the gear ratios', () => {
        expect(partTwo(smallInput)).toStrictEqual(467835);
        expect(partTwo(puzzleInput)).toStrictEqual(75220503);
    });
});
