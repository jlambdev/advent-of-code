import { smallInput, largeInput } from '../fixtures';
import { findSyntaxErrorScore } from '../scoring';

describe('Syntax Scoring', () => {
    it('should find the total syntax error score for illegal characters', () => {
        expect(findSyntaxErrorScore(smallInput)).toStrictEqual(26397);
        expect(findSyntaxErrorScore(largeInput)).toStrictEqual(343863);
    });
});
