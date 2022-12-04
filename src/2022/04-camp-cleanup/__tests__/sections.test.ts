import { largeInput } from '../fixture';
import {
    hasContainedSection,
    hasOverlappingSection,
    sumOfContainedSections,
    sumOfOverlappingSections,
    sumUsingFilterFunction,
} from '../sections';

const smallInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('Camp Cleanup', () => {
    it('should identify if one section contains another section', () => {
        expect(hasContainedSection('2-4,6-8')).toStrictEqual(false);
        expect(hasContainedSection('2-3,4-5')).toStrictEqual(false);
        expect(hasContainedSection('5-7,7-9')).toStrictEqual(false);
        expect(hasContainedSection('2-8,3-7')).toStrictEqual(true);
        expect(hasContainedSection('6-6,4-6')).toStrictEqual(true);
        expect(hasContainedSection('2-6,4-8')).toStrictEqual(false);
    });

    it('should identify the number of contained sections in the input', () => {
        expect(sumUsingFilterFunction(smallInput, hasContainedSection)).toStrictEqual(2);
        expect(sumUsingFilterFunction(largeInput, hasContainedSection)).toStrictEqual(
            538,
        );
    });

    it('should identify if there is any overlap between sections', () => {
        expect(hasOverlappingSection('2-4,6-8')).toStrictEqual(false);
        expect(hasOverlappingSection('2-3,4-5')).toStrictEqual(false);
        expect(hasOverlappingSection('5-7,7-9')).toStrictEqual(true);
        expect(hasOverlappingSection('2-8,3-7')).toStrictEqual(true);
        expect(hasOverlappingSection('6-6,4-6')).toStrictEqual(true);
        expect(hasOverlappingSection('2-6,4-8')).toStrictEqual(true);
    });

    it('should identify the number of overlapping sections in the input', () => {
        expect(sumUsingFilterFunction(smallInput, hasOverlappingSection)).toStrictEqual(
            4,
        );
        expect(sumUsingFilterFunction(largeInput, hasOverlappingSection)).toStrictEqual(
            792,
        );
    });
});
