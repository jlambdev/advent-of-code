import { calories } from '../fixture';
import { totalCalories, totalCaloriesForTopThreeElves } from '../counting';

const smallInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('Calorie Counting', () => {
    it('should identify the most calories one elf is carrying', () => {
        expect(totalCalories(smallInput)).toStrictEqual(24000);
        expect(totalCalories(calories)).toStrictEqual(72478);
    });

    it('should identify total calories for the top three elves', () => {
        expect(totalCaloriesForTopThreeElves(smallInput)).toStrictEqual(45000);
        expect(totalCaloriesForTopThreeElves(calories)).toStrictEqual(210367);
    });
});
