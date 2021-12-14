import { smallInput, largeInput } from '../fixtures';
import { getScores } from '../scoring';

describe('Syntax Scoring', () => {
    it('should find the total syntax error score for illegal characters', () => {
        expect(getScores(smallInput).syntaxErrorScore).toStrictEqual(26397);
        expect(getScores(largeInput).syntaxErrorScore).toStrictEqual(343863);
    });

    it('should autocomplete unfinished strings and find the middle score', () => {
        expect(getScores(smallInput).middleScore).toStrictEqual(288957);
        expect(getScores(largeInput).middleScore).toStrictEqual(2924734236);
    });
});
