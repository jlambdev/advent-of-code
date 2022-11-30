import { program } from '../fixture';
import { run } from '../intcode';

describe('1202 Program Alarm', () => {
    describe('run', () => {
        it('should handle single `opcode` programs', () => {
            expect(run('1,0,0,0,99')).toStrictEqual([2, 0, 0, 0, 99]);
            expect(run('2,3,0,3,99')).toStrictEqual([2, 3, 0, 6, 99]);
            expect(run('2,4,4,5,99,0')).toStrictEqual([2, 4, 4, 5, 99, 9801]);
        });

        it('should handle multiple `opcode` programs', () => {
            expect(run('1,1,1,4,99,5,6,0,99')).toStrictEqual([
                30, 1, 1, 4, 2, 5, 6, 0, 99,
            ]);
        });

        it('should work with pre-run replacements', () => {
            const replacements = [
                [1, 12],
                [2, 2],
            ];
            const output = run(program, replacements);
            expect(output[0]).toStrictEqual(7594646);
        });
    });
});
