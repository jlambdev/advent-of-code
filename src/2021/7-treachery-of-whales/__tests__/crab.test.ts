import { leastFuelConstantCost, leastFuelIncreasingCost } from '../crab';
import { smallCrabSet, largeCrabSet } from '../fixtures';

describe('Crab alignment', () => {
    it('should find the alignment that needs the least fuel (constant cost)', () => {
        expect(leastFuelConstantCost(smallCrabSet)).toStrictEqual(37);
        expect(leastFuelConstantCost(largeCrabSet)).toStrictEqual(344735);
    });

    it('should find the alignment that needs the least fuel (increasing cost)', () => {
        expect(leastFuelIncreasingCost(smallCrabSet)).toStrictEqual(168);
        expect(leastFuelIncreasingCost(largeCrabSet)).toStrictEqual(96798233);
    });
});
