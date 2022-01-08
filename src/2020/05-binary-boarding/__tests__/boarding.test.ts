import { getSeatId } from '../boarding';

describe('Binary Boarding', () => {
    describe('getSeatId', () => {
        it('should identify the Seat ID, based on the boarding pass', () => {
            expect(getSeatId('FBFBBFFRLR')).toStrictEqual(357);
            expect(getSeatId('BFFFBBFRRR')).toStrictEqual(567);
            expect(getSeatId('FFFBBBFRRR')).toStrictEqual(119);
            expect(getSeatId('BBFFBBFRLL')).toStrictEqual(820);
        });
    });

    it.todo('should have some tests');
});
