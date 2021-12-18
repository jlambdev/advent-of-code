import { smallInput, largeInput } from '../fixtures';
import {
    sumRiskLevelsForLowPoints,
    productOfThreeLargestBasins,
} from '../points';

describe('Smoke Basin', () => {
    it('should get the sum of all risk levels based on low points', () => {
        expect(sumRiskLevelsForLowPoints(smallInput)).toStrictEqual(15);
        expect(sumRiskLevelsForLowPoints(largeInput)).toStrictEqual(468);
    });

    it('should calculate the product of the three largest basins', () => {
        expect(productOfThreeLargestBasins(smallInput)).toStrictEqual(1134);
        expect(productOfThreeLargestBasins(largeInput)).toStrictEqual(1280496);
    });
});
