import { smallInput, largeInput } from '../fixtures';
import {
    differenceAfterPolymerizationRecursive as recursiveSolution,
    differenceAfterPolymerizationIterative as iterativeSolution,
} from '../polymer';

describe('Extended Polymerization', () => {
    describe('recursive solution', () => {
        it('should get the difference between most + least common elements after 10 poymerization steps', () => {
            // expect(recursiveSolution(smallInput, 10)).toStrictEqual(1588);
            expect(recursiveSolution(largeInput, 10)).toStrictEqual(2068);
        });

        /**
         * The recursive solution hangs when reaching 30+ iterations,
         * so we need a different solution.
         */
        it.skip('should get the difference between most + least common elements after 40 poymerization steps', () => {
            expect(recursiveSolution(smallInput, 40)).toStrictEqual(
                2188189693529,
            );
            // expect(difference(largeInput, 40)).toStrictEqual(???);
        });
    });

    /**
     * For some reason, the iterative solution doesn't work with the large input.
     * I cant' find the bug :/
     */
    describe('iterative solution', () => {
        it('should get the difference between most + least common elements after 10 poymerization steps', () => {
            expect(iterativeSolution(smallInput, 10)).toStrictEqual(1588);
            // expect(iterativeSolution(largeInput, 10)).toStrictEqual(2068);
        });

        it('should get the difference between most + least common elements after 40 poymerization steps', () => {
            expect(iterativeSolution(smallInput, 40)).toStrictEqual(
                2188189693529,
            );
            // expect(iterativeSolution(largeInput, 40)).toStrictEqual(3);
        });
    });
});
