import { sumAnswersForAllGroups } from '../customs';
import { smallInput, puzzleInput } from '../fixtures';

describe('Custom Customs', () => {
    it('should get the sum of questions answered `yes` for all groups', () => {
        expect(sumAnswersForAllGroups(smallInput)).toStrictEqual(11);
        expect(sumAnswersForAllGroups(puzzleInput)).toStrictEqual(6335);
    });
});
