import { testInput, puzzleInput } from '../fixtures';
import { countFlashes, getFlashSyncStep } from '../octopus';

describe('Dumbo Octopus', () => {
    it('counts the number of flashes after 100 steps', () => {
        expect(countFlashes(testInput)).toStrictEqual(1656);
        expect(countFlashes(puzzleInput)).toStrictEqual(1632);
    });

    it('identifies the step number when all octopus flashes are synchronised', () => {
        expect(getFlashSyncStep(testInput)).toStrictEqual(195);
        expect(getFlashSyncStep(puzzleInput)).toStrictEqual(303);
    });
});
