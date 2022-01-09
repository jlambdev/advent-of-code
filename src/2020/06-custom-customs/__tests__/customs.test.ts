import {
    sumAnswersForAllGroups,
    sumConsistentAnswersForAllGroups,
} from '../customs';
import { smallInput, puzzleInput } from '../fixtures';

describe('Custom Customs', () => {
    it('should get the sum of questions answered `yes` for all groups', () => {
        expect(sumAnswersForAllGroups(smallInput)).toStrictEqual(11);
        expect(sumAnswersForAllGroups(puzzleInput)).toStrictEqual(6335);
    });

    it('should sum only answers that were given by all group members', () => {
        expect(sumConsistentAnswersForAllGroups(smallInput)).toStrictEqual(6);
        expect(sumConsistentAnswersForAllGroups(puzzleInput)).toStrictEqual(
            3392,
        );
    });
});
