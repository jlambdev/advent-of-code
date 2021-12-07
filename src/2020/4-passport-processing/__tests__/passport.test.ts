import {
    smallBatchFile,
    largeBatchFile,
    invalidPassports,
    validPassports,
} from '../fixtures';
import {
    countPassportsWithMandatoryKeys,
    countFullyValidPassports,
} from '../passport';

describe('Passport Processing', () => {
    it('should identify the number of passports with mandatory keys', () => {
        expect(countPassportsWithMandatoryKeys(smallBatchFile)).toStrictEqual(
            2,
        );
        // 205 is too low
        expect(countPassportsWithMandatoryKeys(largeBatchFile)).toStrictEqual(
            206,
        );
    });

    it('should count passports with keys and valid values', () => {
        expect(countFullyValidPassports(invalidPassports)).toStrictEqual(0);
        expect(countFullyValidPassports(validPassports)).toStrictEqual(4);

        expect(countFullyValidPassports(smallBatchFile)).toStrictEqual(2);
        expect(countFullyValidPassports(largeBatchFile)).toStrictEqual(123);
    });
});
