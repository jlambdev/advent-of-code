import { partOne, partTwo } from './scratchcards';
import { smallInput, puzzleInput } from './input';

describe('Scratchcards', () => {
    it('can identify the total points for all scratchcards', () => {
        expect(partOne(smallInput)).toStrictEqual(13);
        expect(partOne(puzzleInput)).toStrictEqual(15205);
    });

    it('can identify the total number of copies generated', () => {
        expect(partTwo(smallInput)).toStrictEqual(30);
        expect(partTwo(puzzleInput)).toStrictEqual(6189740);
    });
});
