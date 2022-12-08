import { smallInput, largeInput } from '../fixture';
import { inputToMatrix, scanMap, numVisibleTrees, highestScenicScore } from '../trees';

describe('Treetop Tree House', () => {
    it('should convert the stringified map into a two dimensional matrix of numbers', () => {
        const matrix = inputToMatrix(smallInput);

        expect(matrix[0][0]).toStrictEqual(3);
        expect(matrix[0][3]).toStrictEqual(7);
        expect(matrix[0][4]).toStrictEqual(3);
        expect(matrix[4][0]).toStrictEqual(3);
        expect(matrix[4][1]).toStrictEqual(5);
        expect(matrix[4][4]).toStrictEqual(0);
    });

    describe('should identify if a tree is visible', () => {
        const matrix = inputToMatrix(smallInput);

        it('from the left', () => {
            // left edges
            expect(scanMap(0, 0, 'left', matrix)[0]).toStrictEqual(true);
            expect(scanMap(2, 0, 'left', matrix)[0]).toStrictEqual(true);
            expect(scanMap(4, 0, 'left', matrix)[0]).toStrictEqual(true);
            // other
            expect(scanMap(0, 1, 'left', matrix)[0]).toStrictEqual(false);
            expect(scanMap(1, 1, 'left', matrix)[0]).toStrictEqual(true);
            expect(scanMap(2, 2, 'left', matrix)[0]).toStrictEqual(false);
            expect(scanMap(4, 4, 'left', matrix)[0]).toStrictEqual(false);
        });

        it('from the right', () => {
            // right edges
            expect(scanMap(1, 4, 'right', matrix)[0]).toStrictEqual(true);
            expect(scanMap(3, 4, 'right', matrix)[0]).toStrictEqual(true);
            // other
            expect(scanMap(0, 3, 'right', matrix)[0]).toStrictEqual(true);
            expect(scanMap(1, 2, 'right', matrix)[0]).toStrictEqual(true);
            expect(scanMap(2, 2, 'right', matrix)[0]).toStrictEqual(false);
            expect(scanMap(4, 1, 'right', matrix)[0]).toStrictEqual(false);
        });

        it('from the top', () => {
            // top edges
            expect(scanMap(0, 0, 'top', matrix)[0]).toStrictEqual(true);
            expect(scanMap(0, 2, 'top', matrix)[0]).toStrictEqual(true);
            expect(scanMap(0, 4, 'top', matrix)[0]).toStrictEqual(true);
            // other
            expect(scanMap(1, 1, 'top', matrix)[0]).toStrictEqual(true);
            expect(scanMap(2, 2, 'top', matrix)[0]).toStrictEqual(false);
            expect(scanMap(3, 3, 'top', matrix)[0]).toStrictEqual(false);
            expect(scanMap(4, 3, 'top', matrix)[0]).toStrictEqual(true);
            expect(scanMap(4, 4, 'top', matrix)[0]).toStrictEqual(false);
        });

        it('from the bottom', () => {
            // bottom edges
            expect(scanMap(4, 1, 'bottom', matrix)[0]).toStrictEqual(true);
            expect(scanMap(4, 3, 'bottom', matrix)[0]).toStrictEqual(true);
            // other
            expect(scanMap(0, 1, 'bottom', matrix)[0]).toStrictEqual(false);
            expect(scanMap(2, 1, 'bottom', matrix)[0]).toStrictEqual(false);
            expect(scanMap(2, 3, 'bottom', matrix)[0]).toStrictEqual(false);
            expect(scanMap(3, 4, 'bottom', matrix)[0]).toStrictEqual(true);
        });
    });

    describe('should get the viewing distance', () => {
        const matrix = inputToMatrix(smallInput);

        it('from the left', () => {
            // left edges
            expect(scanMap(0, 0, 'left', matrix)[1]).toStrictEqual(0);
            expect(scanMap(2, 0, 'left', matrix)[1]).toStrictEqual(0);
            expect(scanMap(4, 0, 'left', matrix)[1]).toStrictEqual(0);
            // other
            expect(scanMap(0, 1, 'left', matrix)[1]).toStrictEqual(1);
            expect(scanMap(1, 1, 'left', matrix)[1]).toStrictEqual(1);
            expect(scanMap(2, 2, 'left', matrix)[1]).toStrictEqual(1);
            expect(scanMap(4, 4, 'left', matrix)[1]).toStrictEqual(1);
        });

        it('from the right', () => {
            // right edges
            expect(scanMap(1, 4, 'right', matrix)[1]).toStrictEqual(0);
            expect(scanMap(3, 4, 'right', matrix)[1]).toStrictEqual(0);
            // other
            expect(scanMap(0, 3, 'right', matrix)[1]).toStrictEqual(1);
            expect(scanMap(1, 2, 'right', matrix)[1]).toStrictEqual(2);
            expect(scanMap(2, 2, 'right', matrix)[1]).toStrictEqual(1);
            expect(scanMap(4, 1, 'right', matrix)[1]).toStrictEqual(2);
        });

        it('from the top', () => {
            // top edges
            expect(scanMap(0, 0, 'top', matrix)[1]).toStrictEqual(0);
            expect(scanMap(0, 2, 'top', matrix)[1]).toStrictEqual(0);
            expect(scanMap(0, 4, 'top', matrix)[1]).toStrictEqual(0);
            // other
            expect(scanMap(1, 1, 'top', matrix)[1]).toStrictEqual(1);
            expect(scanMap(2, 2, 'top', matrix)[1]).toStrictEqual(1);
            expect(scanMap(3, 3, 'top', matrix)[1]).toStrictEqual(3);
            expect(scanMap(4, 3, 'top', matrix)[1]).toStrictEqual(4);
            expect(scanMap(4, 4, 'top', matrix)[1]).toStrictEqual(1);
        });

        it('from the bottom', () => {
            // bottom edges
            expect(scanMap(4, 1, 'bottom', matrix)[1]).toStrictEqual(0);
            expect(scanMap(4, 3, 'bottom', matrix)[1]).toStrictEqual(0);
            // other
            expect(scanMap(0, 1, 'bottom', matrix)[1]).toStrictEqual(1);
            expect(scanMap(2, 1, 'bottom', matrix)[1]).toStrictEqual(2);
            expect(scanMap(2, 3, 'bottom', matrix)[1]).toStrictEqual(1);
            expect(scanMap(3, 4, 'bottom', matrix)[1]).toStrictEqual(1);
        });
    });

    it('should identify how many trees are visible from outside the grid', () => {
        expect(numVisibleTrees(smallInput)).toStrictEqual(21);
        expect(numVisibleTrees(largeInput)).toStrictEqual(1560);
    });

    it('should identify the highest scenic score of any trees', () => {
        expect(highestScenicScore(smallInput)).toStrictEqual(8);
        expect(highestScenicScore(largeInput)).toStrictEqual(252000);
    });
});
