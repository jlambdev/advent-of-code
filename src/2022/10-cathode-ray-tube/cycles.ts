export class CPU {
    register: number;
    clockCycle: number;

    private readonly operationQueue: Array<() => void>;

    constructor() {
        this.register = 1;
        this.clockCycle = 1;
        this.operationQueue = [];
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

export class CRT {
    spriteLine: string; // 40 char string

    private screen: Array<Array<string>>; // 0 - 6 rows of arrays of chars

    constructor() {
        this.drawSpriteOnLine(1);
        this.screen = [...Array(6)].map((_) => []);
    }

    drawSpriteOnLine(spritePosition: number): void {
        const line: Array<string> = [];
        for (let i = 0; i < 40; i++) {
            const pixel = Math.abs(spritePosition - i) <= 1 ? '#' : '.';
            line.push(pixel);
        }
        this.spriteLine = line.join('');
    }

    drawPixel(currentCycle: number): void {
        const rowNumber = Math.floor((currentCycle - 1) / 40);
        this.screen[rowNumber].push(this.spriteLine[(currentCycle - 1) % 40]);
    }

    get image(): string {
        return this.screen.map((row) => row.join('')).join('\n');
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
    image: string;
} {
    const cpu = new CPU();
    const signalStrengths = new Map<number, number>();
    const crt = new CRT();

    input.split('\n').forEach((instruction) => {
        if (isNoop(instruction)) {
            cpu.noop();
        } else {
            const newRegistryValue = Number(instruction.split(' ')[1]);
            cpu.addX(newRegistryValue);
        }
    });

    while (cpu.pendingOperations > 0) {
        crt.drawPixel(cpu.clockCycle);
        cpu.tick();
        if (signalStrengthsAt.has(cpu.clockCycle)) {
            signalStrengths.set(cpu.clockCycle, cpu.clockCycle * cpu.register);
        }
        crt.drawSpriteOnLine(cpu.register);
    }

    return {
        cpu,
        signalStrengths,
        image: crt.image,
    };
}

export function sumOfSignalStrengths(signalStrengths: Map<number, number>): number {
    let sum = 0;
    for (let [_, strength] of signalStrengths) {
        sum += strength;
    }
    return sum;
}
