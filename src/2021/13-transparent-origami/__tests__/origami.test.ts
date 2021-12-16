import { smallInputTransformed, largeInputTransformed } from '../assertions';
import { smallInput, largeInput } from '../fixtures';
import { countDotsAfterFirstFold, revealLetterCode } from '../origami';

describe('Transparent Origami', () => {
    it('should count the number of visible dots after the first fold instruction', () => {
        expect(countDotsAfterFirstFold(smallInput)).toStrictEqual(17);
        expect(countDotsAfterFirstFold(largeInput)).toStrictEqual(731);
    });

    it('should complete folding instructions to reveal a code (in letters)', () => {
        expect(revealLetterCode(smallInput)).toStrictEqual(
            smallInputTransformed,
        );
        expect(revealLetterCode(largeInput)).toStrictEqual(
            largeInputTransformed,
        );
    });
});
