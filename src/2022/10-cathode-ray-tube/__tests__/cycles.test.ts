import { smallInput, largeInput, puzzleInput } from '../fixture';
import { CPU, CRT, runProgram, sumOfSignalStrengths } from '../cycles';

const largeInputImage = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

// RGLRBZAU
const puzzleInputImage = `###...##..#....###..###..####..##..#..#.
#..#.#..#.#....#..#.#..#....#.#..#.#..#.
#..#.#....#....#..#.###....#..#..#.#..#.
###..#.##.#....###..#..#..#...####.#..#.
#.#..#..#.#....#.#..#..#.#....#..#.#..#.
#..#..###.####.#..#.###..####.#..#..##..`;

describe('Cathode-Ray Tube', () => {
    describe('CPU', () => {
        it('creates a CPU with a single register value of `1`', () => {
            const cpu = new CPU();
            expect(cpu.register).toStrictEqual(1);
        });

        it('calls `noop` that queues an empty function in the CPU operation queue', () => {
            const cpu = new CPU();
            const initialregister = cpu.register;
            expect(cpu.clockCycle).toStrictEqual(1);

            cpu.noop();
            expect(cpu.pendingOperations).toStrictEqual(1);

            cpu.tick();
            expect(cpu.clockCycle).toStrictEqual(2);
            expect(cpu.register).toStrictEqual(initialregister);
            expect(cpu.pendingOperations).toStrictEqual(0);
        });

        it('calls `addX` that queues a registry value changes after 2 cyles', () => {
            const cpu = new CPU();
            const initialregister = cpu.register;
            expect(cpu.clockCycle).toStrictEqual(1);

            cpu.addX(3);
            expect(cpu.pendingOperations).toStrictEqual(2);

            cpu.tick();
            expect(cpu.clockCycle).toStrictEqual(2);
            expect(cpu.register).toStrictEqual(initialregister);
            expect(cpu.pendingOperations).toStrictEqual(1);

            cpu.tick();
            expect(cpu.clockCycle).toStrictEqual(3);
            expect(cpu.register).toStrictEqual(4);
            expect(cpu.pendingOperations).toStrictEqual(0);
        });
    });

    describe('Program', () => {
        it('runs a program that loads and executes all the instructions', () => {
            const emptySet = new Set<number>();
            const { cpu } = runProgram(smallInput, emptySet);

            expect(cpu.clockCycle).toStrictEqual(6);
            expect(cpu.register).toStrictEqual(-1);
            expect(cpu.pendingOperations).toStrictEqual(0);
        });

        it('gets the signal strength of a program at a specific cycle for large programs', () => {
            const signalStrengthsAt = new Set<number>([20, 60, 100, 140, 180, 220]);
            const { signalStrengths } = runProgram(largeInput, signalStrengthsAt);

            expect(signalStrengths.get(20)).toStrictEqual(420);
            expect(signalStrengths.get(60)).toStrictEqual(1140);
            expect(signalStrengths.get(100)).toStrictEqual(1800);
            expect(signalStrengths.get(140)).toStrictEqual(2940);
            expect(signalStrengths.get(180)).toStrictEqual(2880);
            expect(signalStrengths.get(220)).toStrictEqual(3960);
        });

        it('gets the sum of all signal strengths for a large program', () => {
            const signalStrengthsAt = new Set<number>([20, 60, 100, 140, 180, 220]);

            const { signalStrengths: largeInputResult } = runProgram(
                largeInput,
                signalStrengthsAt,
            );
            expect(sumOfSignalStrengths(largeInputResult)).toStrictEqual(13140);

            const { signalStrengths: puzzleInputResult } = runProgram(
                puzzleInput,
                signalStrengthsAt,
            );
            expect(sumOfSignalStrengths(puzzleInputResult)).toStrictEqual(14420);
        });

        it('draws an image using a CRT for large programs', () => {
            const emptySet = new Set<number>();
            const { image: largeInputResult } = runProgram(largeInput, emptySet);
            expect(largeInputResult).toStrictEqual(largeInputImage);

            const { image: puzzleInputResult } = runProgram(puzzleInput, emptySet);
            expect(puzzleInputResult).toStrictEqual(puzzleInputImage);
        });
    });

    describe('CRT', () => {
        it('should create a CRT that keeps track of the sprite position on a 40 char line', () => {
            const crt = new CRT();
            expect(crt.spriteLine).toStrictEqual(
                '###.....................................',
            );

            crt.drawSpriteOnLine(0);
            expect(crt.spriteLine).toStrictEqual(
                '##......................................',
            );

            crt.drawSpriteOnLine(16);
            expect(crt.spriteLine).toStrictEqual(
                '...............###......................',
            );

            crt.drawSpriteOnLine(39);
            expect(crt.spriteLine).toStrictEqual(
                '......................................##',
            );
        });

        it('should create multi-line image, where the line number is based on the current cycle', () => {
            const crt = new CRT();

            crt.drawPixel(39);
            crt.drawPixel(40);
            crt.drawPixel(41);
            crt.drawPixel(42);
            crt.drawPixel(81);
            crt.drawPixel(82);
            crt.drawPixel(130);
            crt.drawPixel(131);
            crt.drawPixel(161);
            crt.drawPixel(162);
            crt.drawPixel(210);
            crt.drawPixel(240);

            expect(crt.image).toStrictEqual('..\n##\n##\n..\n##\n..');
        });
    });
});
