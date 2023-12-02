import { puzzleInput } from './input';
import { sumFrequencies, firstDuplicateFrequency } from './calibration';

describe('Chronal Calibration', () => {
    it('should sum the frequencies', () => {
        expect(sumFrequencies('+1\n+1\n+1')).toStrictEqual(3);
        expect(sumFrequencies('+1\n+1\n-2')).toStrictEqual(0);
        expect(sumFrequencies('-1\n-2\n-3')).toStrictEqual(-6);

        expect(sumFrequencies(puzzleInput)).toStrictEqual(433);
    });

    it('should find the first duplicate frequency', () => {
        expect(firstDuplicateFrequency('+1\n-1')).toStrictEqual(0);
        expect(firstDuplicateFrequency('+3\n+3\n+4\n-2\n-4')).toStrictEqual(10);
        expect(firstDuplicateFrequency('-6\n+3\n+8\n+5\n-6')).toStrictEqual(5);
        expect(firstDuplicateFrequency('+7\n+7\n-2\n-7\n-4')).toStrictEqual(14);

        expect(firstDuplicateFrequency(puzzleInput)).toStrictEqual(256);
    });
});
