import { smallInput, puzzleInput } from './input';
import { partOne, partTwo } from './guards';

describe('Repose Record', () => {
    it('should identify the ID of the sleepiest guard & most common minute', () => {
        expect(partOne(smallInput)).toStrictEqual(240);
        expect(partOne(puzzleInput)).toStrictEqual(72925);
    });

    it('should identify the guard most frequently asleep on the same minute', () => {
        expect(partTwo(smallInput)).toStrictEqual(4455);
        expect(partTwo(puzzleInput)).toStrictEqual(49137);
    });
});
