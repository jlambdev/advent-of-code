import { smallInput, largeInput } from '../fixtures';
import { differenceAfterPolymerization as difference } from '../polymer';

describe('Extended Polymerization', () => {
    it('should get the difference between most + least common elements after 10 poymerization steps', () => {
        expect(difference(smallInput, 10)).toStrictEqual(1588);
        expect(difference(largeInput, 10)).toStrictEqual(2068);
    });

    // currently the runtime is too long for iterations of 30+, it needs to be optimised somehow
    it.skip('should get the difference between most + least common elements after 40 poymerization steps', () => {
        expect(difference(smallInput, 40)).toStrictEqual(2188189693529);
        // expect(difference(largeInput, 40)).toStrictEqual(1);
    });
});
