import { getWeight, smallestNumberOfSteps } from '../climb';
import { smallInput, puzzleInput } from '../fixture';

describe('Hill Climbing Algorithm', () => {
    it('should get the `weight` between two step values (letters)', () => {
        expect(getWeight('a', 'b')).toStrictEqual(1);
        expect(getWeight('a', 'j')).toStrictEqual(9);
        expect(getWeight('y', 'z')).toStrictEqual(1);
        expect(getWeight('a', 'z')).toStrictEqual(25);
    });

    it.skip('should identify the fewest steps needed to reach the goal', () => {
        expect(smallestNumberOfSteps(smallInput)).toStrictEqual(31);
        // expect(smallestNumberOfSteps(puzzleInput)).toStrictEqual(1);
    });
});
