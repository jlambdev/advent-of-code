import {
    getHeight,
    smallestNumberOfSteps,
    Coordinates,
    getNeighbours,
    makeGrid,
    findStartAndEnd,
    EdgeList,
    sortEdgeListByMinDistance,
} from '../climb';
import { smallInput, puzzleInput } from '../fixture';

describe('Hill Climbing Algorithm', () => {
    it('should get the `weight` between two step values (letters)', () => {
        expect(getHeight('a', 'b')).toStrictEqual(1);
        expect(getHeight('a', 'j')).toStrictEqual(9);
        expect(getHeight('y', 'z')).toStrictEqual(1);
        expect(getHeight('a', 'z')).toStrictEqual(25);
        expect(getHeight('S', 'b')).toStrictEqual(1);
        expect(getHeight('y', 'E')).toStrictEqual(1);
    });

    it('should convert the input into a 2x2 grid', () => {
        const grid = makeGrid(smallInput);

        expect(grid.length).toStrictEqual(5);
        expect(grid[0].length).toStrictEqual(8);
        expect(grid[2][2]).toStrictEqual('c');
    });

    it('should identify the start and the end points in a grid', () => {
        const grid = makeGrid(smallInput);

        const { start, end } = findStartAndEnd(grid);
        expect(start).toStrictEqual([0, 0]);
        expect(end).toStrictEqual([2, 5]);
    });

    it('should identify valid neighbours (next moves) in a 2D grid', () => {
        const grid = makeGrid(smallInput);

        const allNeighbours: Array<Coordinates> = [];
        for (const neighbour of getNeighbours(grid, 1, 4)) {
            allNeighbours.push(neighbour);
        }
        expect(allNeighbours).toStrictEqual([
            [2, 4],
            [0, 4],
            [1, 5],
            [1, 3],
        ]);

        const neighboursBottomLeftCorner: Array<Coordinates> = [];
        for (const neighbour of getNeighbours(grid, 4, 0)) {
            neighboursBottomLeftCorner.push(neighbour);
        }
        expect(neighboursBottomLeftCorner).toStrictEqual([
            [3, 0],
            [4, 1],
        ]);
    });

    it('should sort an edge list by the smallest distance/cost', () => {
        const edgeList: EdgeList = [
            [9, 4, 3],
            [4, 0, 0],
            [7, 1, 2],
            [1, 9, 9],
        ];

        sortEdgeListByMinDistance(edgeList);
        expect(edgeList[0][0]).toStrictEqual(1);
        expect(edgeList[1][0]).toStrictEqual(4);
        expect(edgeList[2][0]).toStrictEqual(7);
        expect(edgeList[3][0]).toStrictEqual(9);
    });

    it('should identify the fewest steps needed to reach the goal', () => {
        expect(smallestNumberOfSteps(smallInput)).toStrictEqual(31);
        expect(smallestNumberOfSteps(puzzleInput)).toStrictEqual(504);
    });
});
