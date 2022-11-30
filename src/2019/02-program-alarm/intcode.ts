const isAddOpcode = (x: number) => x === 1;

const isMultiplyOpcode = (x: number) => x === 2;

const isTerminateOpcode = (x: number) => x === 99;

export const run = (input: string, replacements: number[][] = []) => {
    const program = input.split(',').map(Number);

    for (const pair of replacements) {
        program[pair[0]] = pair[1];
    }

    let pos = 0; // position
    let value = program[pos];

    while (!isTerminateOpcode(value)) {
        const left = program[program[pos + 1]];
        const right = program[program[pos + 2]];

        if (isAddOpcode(value)) {
            program[program[pos + 3]] = left + right;
        } else if (isMultiplyOpcode(value)) {
            program[program[pos + 3]] = left * right;
        }

        // step forward
        pos += 4;
        value = program[pos];
    }

    return program;
};
