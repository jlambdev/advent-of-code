import { smallInput, largeInput } from '../fixtures';
import { differenceAfterPolymerization } from '../polymer';

describe('Extended Polymerization', () => {
    it('should get the difference between most + least common elements after polymerization', () => {
        expect(differenceAfterPolymerization(smallInput)).toStrictEqual(1588);
        // expect(differenceAfterPolymerization(largeInput)).toStrictEqual(1);
    });
});
