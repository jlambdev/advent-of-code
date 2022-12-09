import { smallInput, largeInput } from '../fixture';
import { isTailNearHead, moveHeadWithTail, moveRopeHead } from '../rope';

describe('Rope Bridge', () => {
    const { head, tail, numPositionsTailHasVisited } = moveRopeHead(smallInput);

    it('should identify if the tail is near the head', () => {
        // same position
        expect(isTailNearHead([2, 2], [2, 2])).toStrictEqual(true);
        // immediate neighbour
        expect(isTailNearHead([1, 1], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([1, 1], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([1, 3], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([2, 3], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([3, 3], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([3, 2], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([3, 1], [2, 2])).toStrictEqual(true);
        expect(isTailNearHead([2, 1], [2, 2])).toStrictEqual(true);
        // beyond immediate neighbour
        expect(isTailNearHead([0, 0], [2, 2])).toStrictEqual(false);
        expect(isTailNearHead([4, 3], [2, 2])).toStrictEqual(false);
        expect(isTailNearHead([2, 0], [2, 2])).toStrictEqual(false);
        expect(isTailNearHead([1, 4], [2, 2])).toStrictEqual(false);
    });

    describe('should move the tail knot with the head knot', () => {
        it('right', () => {
            // move into tail position
            expect(moveHeadWithTail([0, 0], [0, 1], 'R')).toStrictEqual([
                [0, 1],
                [0, 1],
            ]);
            // move away from overlap & x +/- 1
            expect(moveHeadWithTail([1, 1], [1, 1], 'R')).toStrictEqual([
                [1, 2],
                [1, 1],
            ]);
            expect(moveHeadWithTail([2, 1], [1, 1], 'R')).toStrictEqual([
                [2, 2],
                [1, 1],
            ]);
            expect(moveHeadWithTail([0, 1], [1, 1], 'R')).toStrictEqual([
                [0, 2],
                [1, 1],
            ]);
            // pull tail into left-align (x,y-1)
            expect(moveHeadWithTail([1, 1], [1, 0], 'R')).toStrictEqual([
                [1, 2],
                [1, 1],
            ]);
            expect(moveHeadWithTail([2, 1], [1, 0], 'R')).toStrictEqual([
                [2, 2],
                [2, 1],
            ]);
            expect(moveHeadWithTail([0, 1], [1, 0], 'R')).toStrictEqual([
                [0, 2],
                [0, 1],
            ]);
        });

        it('left', () => {
            // move into tail position
            expect(moveHeadWithTail([2, 2], [2, 1], 'L')).toStrictEqual([
                [2, 1],
                [2, 1],
            ]);
            // move away from overlap & x +/- 1
            expect(moveHeadWithTail([2, 2], [2, 2], 'L')).toStrictEqual([
                [2, 1],
                [2, 2],
            ]);
            expect(moveHeadWithTail([3, 2], [2, 2], 'L')).toStrictEqual([
                [3, 1],
                [2, 2],
            ]);
            expect(moveHeadWithTail([1, 2], [2, 2], 'L')).toStrictEqual([
                [1, 1],
                [2, 2],
            ]);
            // pull tail into right-align (x,y+1)
            expect(moveHeadWithTail([2, 1], [2, 2], 'L')).toStrictEqual([
                [2, 0],
                [2, 1],
            ]);
            expect(moveHeadWithTail([3, 1], [2, 2], 'L')).toStrictEqual([
                [3, 0],
                [3, 1],
            ]);
            expect(moveHeadWithTail([1, 1], [2, 2], 'L')).toStrictEqual([
                [1, 0],
                [1, 1],
            ]);
        });

        it('up', () => {
            // move into tail position
            expect(moveHeadWithTail([1, 1], [2, 1], 'U')).toStrictEqual([
                [2, 1],
                [2, 1],
            ]);
            // move away from overlap & y +/- 1
            expect(moveHeadWithTail([1, 1], [1, 1], 'U')).toStrictEqual([
                [2, 1],
                [1, 1],
            ]);
            expect(moveHeadWithTail([1, 2], [1, 1], 'U')).toStrictEqual([
                [2, 2],
                [1, 1],
            ]);
            expect(moveHeadWithTail([1, 0], [1, 1], 'U')).toStrictEqual([
                [2, 0],
                [1, 1],
            ]);
            // pull tail into bottom-align (x-1,y)
            expect(moveHeadWithTail([1, 1], [0, 1], 'U')).toStrictEqual([
                [2, 1],
                [1, 1],
            ]);
            expect(moveHeadWithTail([1, 2], [0, 1], 'U')).toStrictEqual([
                [2, 2],
                [1, 2],
            ]);
            expect(moveHeadWithTail([1, 0], [0, 1], 'U')).toStrictEqual([
                [2, 0],
                [1, 0],
            ]);
        });

        it('down', () => {
            // move into tail position
            expect(moveHeadWithTail([3, 3], [2, 3], 'D')).toStrictEqual([
                [2, 3],
                [2, 3],
            ]);
            // move away from overlap & y +/- 1
            expect(moveHeadWithTail([3, 3], [3, 3], 'D')).toStrictEqual([
                [2, 3],
                [3, 3],
            ]);
            expect(moveHeadWithTail([3, 4], [3, 3], 'D')).toStrictEqual([
                [2, 4],
                [3, 3],
            ]);
            expect(moveHeadWithTail([3, 2], [3, 3], 'D')).toStrictEqual([
                [2, 2],
                [3, 3],
            ]);
            // pull tail into top-align (x+1,y)
            expect(moveHeadWithTail([3, 3], [4, 3], 'D')).toStrictEqual([
                [2, 3],
                [3, 3],
            ]);
            expect(moveHeadWithTail([3, 4], [4, 3], 'D')).toStrictEqual([
                [2, 4],
                [3, 4],
            ]);
            expect(moveHeadWithTail([3, 2], [4, 3], 'D')).toStrictEqual([
                [2, 2],
                [3, 2],
            ]);
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
        expect(moveRopeHead(largeInput).numPositionsTailHasVisited).toStrictEqual(6464);
    });
});
