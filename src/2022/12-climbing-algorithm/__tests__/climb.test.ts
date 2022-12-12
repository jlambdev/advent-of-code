import { smallestNumberOfSteps } from '../climb';
import { smallInput, puzzleInput } from '../fixture';

describe('Hill Climbing Algorithm', () => {
    it.skip('should identify the fewest steps needed to reach the goal', () => {
        expect(smallestNumberOfSteps(smallInput, [0, 0])).toStrictEqual(31);
        // expect(climb(puzzleInput, [0, 20])).toStrictEqual(1);
    });
});
