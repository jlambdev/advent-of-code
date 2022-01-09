import { getHighestSeatId, getSeatId, getMissingSeatId } from '../boarding';
import { puzzleInput } from '../fixtures';

describe('Binary Boarding', () => {
    describe('getSeatId', () => {
        it('should identify the Seat ID, based on the boarding pass', () => {
            expect(getSeatId('FBFBBFFRLR')).toStrictEqual(357);
            expect(getSeatId('BFFFBBFRRR')).toStrictEqual(567);
            expect(getSeatId('FFFBBBFRRR')).toStrictEqual(119);
            expect(getSeatId('BBFFBBFRLL')).toStrictEqual(820);
        });
    });

    describe('getHighestSeatId', () => {
        it('should identify many seat IDs and return the highest value', () => {
            expect(getHighestSeatId(puzzleInput)).toStrictEqual(850);
        });
    });

    describe('getMissingSeatId', () => {
        it('should find the missing seat ID, based on all boarding passes', () => {
            expect(getMissingSeatId(puzzleInput)).toStrictEqual(599);
        });
    });
});
