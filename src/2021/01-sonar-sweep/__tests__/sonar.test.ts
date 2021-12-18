import { sampleReport } from '../fixtures';
import {
    countIncreases,
    countIncreasesLowerSpaceComplexity,
    slidingWindowOfThree,
} from '../sonar';

describe('sonar', () => {
    it('should identify the number of increases', () => {
        expect(countIncreases(sampleReport)).toStrictEqual(1681);
        expect(countIncreasesLowerSpaceComplexity(sampleReport)).toStrictEqual(
            1681,
        );
    });

    it('should count sliding window increases of three', () => {
        expect(slidingWindowOfThree(sampleReport)).toStrictEqual(1704);
    });
});
