import { passwords, smallInput } from '../fixtures';
import {
    countValidSledRentalPasswords,
    countValidTobogganPasswords,
} from '../passwords';

describe('Password Philosophy', () => {
    it('should find the number of valid password (Sled Rental policy)', () => {
        expect(countValidSledRentalPasswords(passwords)).toStrictEqual(483);
    });

    it('should find the number of valid password (Toboggan policy)', () => {
        expect(countValidTobogganPasswords(smallInput)).toStrictEqual(1);
        // 267  and 246 are too low
        // 728 is too high
        expect(countValidTobogganPasswords(passwords)).toStrictEqual(482);
    });
});
