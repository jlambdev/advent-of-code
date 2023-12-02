import { sumCalibrationValuesPartOne, sumCalibrationValuesPartTwo } from './trebuchet';
import { document, partOneSample, partTwoSample } from './input';

describe('Trebuchet?!', () => {
    it('should sum calibration values (numbers only)', () => {
        expect(sumCalibrationValuesPartOne(partOneSample)).toStrictEqual(142);
        expect(sumCalibrationValuesPartOne(document)).toStrictEqual(55712);
    });

    it('should sum calibration values (numbers and letters)', () => {
        expect(sumCalibrationValuesPartTwo(partTwoSample)).toStrictEqual(281);
        expect(sumCalibrationValuesPartTwo(document)).toStrictEqual(55413);
    });
});
