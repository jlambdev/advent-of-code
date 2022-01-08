import { smallInput, trees } from '../fixtures';
import { countHitTrees, productOfAllRoutes } from '../toboggan';

describe('Toboggan Trajectory', () => {
    it('should identify the number of trees the toboggan will hit', () => {
        expect(countHitTrees(smallInput, 3, 1)).toStrictEqual(7);
        expect(countHitTrees(trees, 3, 1)).toStrictEqual(214);
    });

    it('should identify trees hit on other routes', () => {
        expect(countHitTrees(smallInput, 1, 1)).toStrictEqual(2);
        expect(countHitTrees(smallInput, 5, 1)).toStrictEqual(3);
        expect(countHitTrees(smallInput, 7, 1)).toStrictEqual(4);
        expect(countHitTrees(smallInput, 1, 2)).toStrictEqual(2);
    });

    it('should identify the product of all routes', () => {
        const routes = [
            [1, 1],
            [3, 1],
            [5, 1],
            [7, 1],
            [1, 2],
        ];

        expect(productOfAllRoutes(smallInput, routes)).toStrictEqual(336);
        expect(productOfAllRoutes(trees, routes)).toStrictEqual(8336352024);
    });
});
