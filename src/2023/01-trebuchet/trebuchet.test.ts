import { sumCalibrationValues } from './trebuchet';
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
        expect(sumCalibrationValues(partOneSample)).toStrictEqual(142);
        expect(sumCalibrationValues(document)).toStrictEqual(55712);
    });

    it.skip('should sum calibration values (numbers and letters)', () => {
        expect(sumCalibrationValues(partTwoSample)).toStrictEqual(281);
        // expect(sumCalibrationValues(document)).toStrictEqual(0);
    });
});
