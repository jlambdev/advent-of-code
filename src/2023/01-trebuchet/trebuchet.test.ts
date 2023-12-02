import { sumCalibrationValuesPartOne, sumCalibrationValuesPartTwo } from './trebuchet';
import { document } from './input';

const partOneSample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const partTwoSample = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

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
