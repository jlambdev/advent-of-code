import { smallInput, largeInput, mediumInput } from '../fixture';
import { isNeighbour, moveRope, Rope, buildStartingRope } from '../rope';

describe('Rope Bridge', () => {
    it('should identify if the first knot is near the second', () => {
        // same position
        expect(isNeighbour([2, 2], [2, 2])).toStrictEqual(true);
        // immediate neighbour
        expect(isNeighbour([1, 1], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([1, 1], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([1, 3], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([2, 3], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([3, 3], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([3, 2], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([3, 1], [2, 2])).toStrictEqual(true);
        expect(isNeighbour([2, 1], [2, 2])).toStrictEqual(true);
        // beyond immediate neighbour
        expect(isNeighbour([0, 0], [2, 2])).toStrictEqual(false);
        expect(isNeighbour([4, 3], [2, 2])).toStrictEqual(false);
        expect(isNeighbour([2, 0], [2, 2])).toStrictEqual(false);
        expect(isNeighbour([1, 4], [2, 2])).toStrictEqual(false);
    });

    it('should return a count of the number of positions visited by the tail', () => {
        const ropeOne = buildStartingRope(2);
        expect(moveRope(smallInput, ropeOne)).toStrictEqual(13);

        const ropeTwo = buildStartingRope(2);
        expect(moveRope(largeInput, ropeTwo)).toStrictEqual(6464);
    });

    it('should return the number of positions visited by the end of a ten knot rope', () => {
        const ropeOne = buildStartingRope(10);
        expect(moveRope(smallInput, ropeOne)).toStrictEqual(1);

        const ropeTwo = buildStartingRope(10);
        expect(moveRope(mediumInput, ropeTwo)).toStrictEqual(36);

        const ropeThree = buildStartingRope(10);
        expect(moveRope(largeInput, ropeThree)).toStrictEqual(2604);
    });
});
