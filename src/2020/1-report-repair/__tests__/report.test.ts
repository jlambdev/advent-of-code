import { report } from '../fixture';
import { findSumTwoNumbers, findSumThreeNumbers } from '../report';

describe('Report Repair', () => {
    it('should find the product of the 2 numbers that sum to 2020', () => {
        expect(findSumTwoNumbers(report)).toStrictEqual(744475);
    });

    it('should find the product of the 3 numbers that sum to 2020', () => {
        expect(findSumThreeNumbers(report)).toStrictEqual(70276940);
    });
});
