import { largeInput } from '../fixture';
import { hasContainedSection, sumOfContainedSections } from '../sections';

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
        expect(sumOfContainedSections(smallInput)).toStrictEqual(2);
        expect(sumOfContainedSections(largeInput)).toStrictEqual(538);
    });
});
