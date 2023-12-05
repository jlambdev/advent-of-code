import { partOne } from './scratchcards';
import { smallInput, puzzleInput } from './input';

describe('Scratchcards', () => {
    it('can identify the total points for all scratchcards', () => {
        expect(partOne(smallInput)).toStrictEqual(13);
        expect(partOne(puzzleInput)).toStrictEqual(15205);
    });
});
