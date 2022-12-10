export class CPU {
    private register: number;
    private clockCycle: number;
    private operationQueue: Array<() => void>;

    constructor() {
        this.register = 1;
        this.clockCycle = 1;
        this.operationQueue = [];
    }

    get registerValue(): number {
        return this.register;
    }

    get currentClockCycle(): number {
        return this.clockCycle;
    }

    get pendingOperations(): number {
        return this.operationQueue.length;
    }

    addX(value: number) {
        this.noop();
        this.operationQueue.push(() => (this.register += value));
    }

    noop() {
        this.operationQueue.push(() => {});
    }

    tick() {
        this.operationQueue.shift()();
        this.clockCycle++;
    }
}

function isNoop(instruction: string): boolean {
    return instruction.length === 4;
}

export function runProgram(
    input: string,
    signalStrengthsAt: Set<number>,
): {
    cpu: CPU;
    signalStrengths: Map<number, number>;
} {
    const cpu = new CPU();
    const signalStrengths = new Map<number, number>();

    input.split('\n').forEach((instruction) => {
        if (isNoop(instruction)) {
            cpu.noop();
        } else {
            const newRegistryValue = Number(instruction.split(' ')[1]);
            cpu.addX(newRegistryValue);
        }
    });

    while (cpu.pendingOperations > 0) {
        cpu.tick();
        if (signalStrengthsAt.has(cpu.currentClockCycle)) {
            signalStrengths.set(
                cpu.currentClockCycle,
                cpu.currentClockCycle * cpu.registerValue,
            );
        }
    }

    return {
        cpu,
        signalStrengths,
    };
}

export function sumOfSignalStrengths(signalStrengths: Map<number, number>): number {
    let sum = 0;
    for (let [_, strength] of signalStrengths) {
        sum += strength;
    }
    return sum;
}
