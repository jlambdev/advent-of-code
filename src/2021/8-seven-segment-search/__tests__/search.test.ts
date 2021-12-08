import { countEasyDigits, getProductOfAllNumbers } from '../count';
import { smallInput, largeInput } from '../fixtures';

describe('Seven Segment Search', () => {
    it('should identify the number of times 1, 4, 7, or 8 appear', () => {
        expect(countEasyDigits(smallInput)).toStrictEqual(26);
        expect(countEasyDigits(largeInput)).toStrictEqual(264);
    });

    it('should identify the product of all correctly mapped numbers', () => {
        expect(getProductOfAllNumbers(smallInput)).toStrictEqual(61229);
        // expect(countEasyDigits(largeInput)).toStrictEqual(1);
    });
});
