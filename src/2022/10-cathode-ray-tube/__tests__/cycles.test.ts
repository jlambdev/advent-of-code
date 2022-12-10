import { smallInput, largeInput, puzzleInput } from '../fixture';
import { CPU, runProgram, sumOfSignalStrengths } from '../cycles';

describe('Cathode-Ray Tube', () => {
    it('creates a CPU with a single register value of `1`', () => {
        const cpu = new CPU();
        expect(cpu.registerValue).toStrictEqual(1);
    });

    it('calls `noop` that queues an empty function in the CPU operation queue', () => {
        const cpu = new CPU();
        const initialRegisterValue = cpu.registerValue;
        expect(cpu.currentClockCycle).toStrictEqual(1);

        cpu.noop();
        expect(cpu.pendingOperations).toStrictEqual(1);

        cpu.tick();
        expect(cpu.currentClockCycle).toStrictEqual(2);
        expect(cpu.registerValue).toStrictEqual(initialRegisterValue);
        expect(cpu.pendingOperations).toStrictEqual(0);
    });

    it('calls `addX` that queues a registry value changes after 2 cyles', () => {
        const cpu = new CPU();
        const initialRegisterValue = cpu.registerValue;
        expect(cpu.currentClockCycle).toStrictEqual(1);

        cpu.addX(3);
        expect(cpu.pendingOperations).toStrictEqual(2);

        cpu.tick();
        expect(cpu.currentClockCycle).toStrictEqual(2);
        expect(cpu.registerValue).toStrictEqual(initialRegisterValue);
        expect(cpu.pendingOperations).toStrictEqual(1);

        cpu.tick();
        expect(cpu.currentClockCycle).toStrictEqual(3);
        expect(cpu.registerValue).toStrictEqual(4);
        expect(cpu.pendingOperations).toStrictEqual(0);
    });

    it('runs a program that loads and executes all the instructions', () => {
        const emptySet = new Set<number>();
        const { cpu } = runProgram(smallInput, emptySet);

        expect(cpu.currentClockCycle).toStrictEqual(6);
        expect(cpu.registerValue).toStrictEqual(-1);
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
});
