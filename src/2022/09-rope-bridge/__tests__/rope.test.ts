import { smallInput, largeInput, mediumInput } from '../fixture';
import { isFirstKnotNearSecond, pullKnots, moveRope, Rope } from '../rope';

describe('Rope Bridge', () => {
    const { head, tail, numPositionsTailHasVisited } = moveRope(smallInput, 2);

    it('should identify if the first knot is near the second', () => {
        // same position
        expect(isFirstKnotNearSecond([2, 2], [2, 2])).toStrictEqual(true);
        // immediate neighbour
        expect(isFirstKnotNearSecond([1, 1], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([1, 1], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([1, 3], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([2, 3], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([3, 3], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([3, 2], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([3, 1], [2, 2])).toStrictEqual(true);
        expect(isFirstKnotNearSecond([2, 1], [2, 2])).toStrictEqual(true);
        // beyond immediate neighbour
        expect(isFirstKnotNearSecond([0, 0], [2, 2])).toStrictEqual(false);
        expect(isFirstKnotNearSecond([4, 3], [2, 2])).toStrictEqual(false);
        expect(isFirstKnotNearSecond([2, 0], [2, 2])).toStrictEqual(false);
        expect(isFirstKnotNearSecond([1, 4], [2, 2])).toStrictEqual(false);
    });

    describe('should pull the knots in a given direction', () => {
        const rope = (x1: number, y1: number, x2: number, y2: number): Rope => [
            [x1, y1],
            [x2, y2],
        ];

        it('right', () => {
            // move into tail position
            expect(pullKnots(rope(0, 0, 0, 1), 'R')).toStrictEqual(rope(0, 1, 0, 1));
            // move away from overlap & x +/- 1
            expect(pullKnots(rope(1, 1, 1, 1), 'R')).toStrictEqual(rope(1, 2, 1, 1));
            expect(pullKnots(rope(2, 1, 1, 1), 'R')).toStrictEqual(rope(2, 2, 1, 1));
            expect(pullKnots(rope(0, 1, 1, 1), 'R')).toStrictEqual(rope(0, 2, 1, 1));
            // pull tail into left-align (x,y-1)
            expect(pullKnots(rope(1, 1, 1, 0), 'R')).toStrictEqual(rope(1, 2, 1, 1));
            expect(pullKnots(rope(2, 1, 1, 0), 'R')).toStrictEqual(rope(2, 2, 2, 1));
            expect(pullKnots(rope(0, 1, 1, 0), 'R')).toStrictEqual(rope(0, 2, 0, 1));
        });

        it('left', () => {
            // move into tail position
            expect(pullKnots(rope(2, 2, 2, 1), 'L')).toStrictEqual(rope(2, 1, 2, 1));
            // move away from overlap & x +/- 1
            expect(pullKnots(rope(2, 2, 2, 2), 'L')).toStrictEqual(rope(2, 1, 2, 2));
            expect(pullKnots(rope(3, 2, 2, 2), 'L')).toStrictEqual(rope(3, 1, 2, 2));
            expect(pullKnots(rope(1, 2, 2, 2), 'L')).toStrictEqual(rope(1, 1, 2, 2));
            // pull tail into right-align (x,y+1)
            expect(pullKnots(rope(2, 1, 2, 2), 'L')).toStrictEqual(rope(2, 0, 2, 1));
            expect(pullKnots(rope(3, 1, 2, 2), 'L')).toStrictEqual(rope(3, 0, 3, 1));
            expect(pullKnots(rope(1, 1, 2, 2), 'L')).toStrictEqual(rope(1, 0, 1, 1));
        });

        it('up', () => {
            // move into tail position
            expect(pullKnots(rope(1, 1, 2, 1), 'U')).toStrictEqual(rope(2, 1, 2, 1));
            // move away from overlap & y +/- 1
            expect(pullKnots(rope(1, 1, 1, 1), 'U')).toStrictEqual(rope(2, 1, 1, 1));
            expect(pullKnots(rope(1, 2, 1, 1), 'U')).toStrictEqual(rope(2, 2, 1, 1));
            expect(pullKnots(rope(1, 0, 1, 1), 'U')).toStrictEqual(rope(2, 0, 1, 1));
            // pull tail into bottom-align (x-1,y)
            expect(pullKnots(rope(1, 1, 0, 1), 'U')).toStrictEqual(rope(2, 1, 1, 1));
            expect(pullKnots(rope(1, 2, 0, 1), 'U')).toStrictEqual(rope(2, 2, 1, 2));
            expect(pullKnots(rope(1, 0, 0, 1), 'U')).toStrictEqual(rope(2, 0, 1, 0));
        });

        it('down', () => {
            // move into tail position
            expect(pullKnots(rope(3, 3, 2, 3), 'D')).toStrictEqual(rope(2, 3, 2, 3));
            // move away from overlap & y +/- 1
            expect(pullKnots(rope(3, 3, 3, 3), 'D')).toStrictEqual(rope(2, 3, 3, 3));
            expect(pullKnots(rope(3, 4, 3, 3), 'D')).toStrictEqual(rope(2, 4, 3, 3));
            expect(pullKnots(rope(3, 2, 3, 3), 'D')).toStrictEqual(rope(2, 2, 3, 3));
            // pull tail into top-align (x+1,y)
            expect(pullKnots(rope(3, 3, 4, 3), 'D')).toStrictEqual(rope(2, 3, 3, 3));
            expect(pullKnots(rope(3, 4, 4, 3), 'D')).toStrictEqual(rope(2, 4, 3, 4));
            expect(pullKnots(rope(3, 2, 4, 3), 'D')).toStrictEqual(rope(2, 2, 3, 2));
        });
    });

    it('should move the head according to a series of motions', () => {
        expect(head).toStrictEqual([2, 2]);
    });

    it('should move the tail as the head moves', () => {
        expect(tail).toStrictEqual([2, 1]);
    });

    it('should return a count of the number of positions visited by the tail', () => {
        expect(numPositionsTailHasVisited).toStrictEqual(13);
        expect(moveRope(largeInput, 2).numPositionsTailHasVisited).toStrictEqual(6464);
    });

    it('should return the number of positions visited by the end of a ten knot rope', () => {
        expect(moveRope(smallInput, 10).numPositionsTailHasVisited).toStrictEqual(1);
        expect(moveRope(mediumInput, 10).numPositionsTailHasVisited).toStrictEqual(36);
        /*
            This answer is too low.
            Something isn't right with the first example (smallInput) at the end either: 
            the final state has the 5th knot where it's x & y position is +1 more than expected.
        */
        expect(moveRope(largeInput, 10).numPositionsTailHasVisited).toStrictEqual(2424); // 2424: too low
    });
});
