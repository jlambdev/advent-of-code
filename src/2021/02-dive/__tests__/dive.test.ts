import { aim, basicDive } from '../dive';
import { sampleCourse } from '../fixtures';

describe('Dive', () => {
    describe('basicDive', () => {
        it('should navigate the course and return distance * depth', () => {
            expect(basicDive(sampleCourse)).toStrictEqual(1893605);
        });
    });

    describe('aim', () => {
        it('should set the aim and modify the depth by this value', () => {
            expect(aim(sampleCourse)).toStrictEqual(2120734350);
        });
    });
});
