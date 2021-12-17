import { countFishWithArray, countFishWithMaths } from '../fish';
import { fishAges, smallInput } from '../fixtures';

describe('Lanternfish', () => {
    it('should count the number of lanternfish after 80 days using array', () => {
        expect(countFishWithArray(smallInput, 80)).toStrictEqual(5934);
        expect(countFishWithArray(fishAges, 80)).toStrictEqual(388739);
    });

    it('should count the number of lanternfish after 80 days using maths', () => {
        expect(countFishWithMaths(smallInput, 80)).toStrictEqual(5934);
        expect(countFishWithMaths(fishAges, 80)).toStrictEqual(388739);
    });

    it('should count the number of lanternfish after 256 days', () => {
        expect(countFishWithMaths(smallInput, 256)).toStrictEqual(26984457539);
        expect(countFishWithMaths(fishAges, 256)).toStrictEqual(1741362314973);
    });
});
