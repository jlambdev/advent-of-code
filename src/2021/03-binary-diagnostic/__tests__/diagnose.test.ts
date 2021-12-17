import { lifeSupportRating, powerConsumption } from '../diagnose';
import { report } from '../fixtures';

describe('Diagnose', () => {
    it('should return the power consumption', () => {
        expect(powerConsumption(report)).toStrictEqual(3633500);
    });

    it('should find the life support rating', () => {
        // 3045465 is too low
        // 4583458 is too high
        expect(lifeSupportRating(report)).toStrictEqual(4550283);
    });
});
